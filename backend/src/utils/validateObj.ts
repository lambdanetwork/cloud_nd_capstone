import { validate } from "class-validator";

export async function validateObj<T>(
  body: T,
  classFunction: { new (): T }
): Promise<true | Array<{ [key: string]: { [key: string]: string } }>> {
  try {
    const objTobeValidated = new classFunction();
    Object.keys(body).forEach((key) => {
      const value = body[key];
      objTobeValidated[key] = value;
    });

    const errorResult = await validate(objTobeValidated);
    if (errorResult.length > 0) {
      return errorResult.map((errorObj) => {
        const property = errorObj.property;
        const messages = errorObj.constraints;

        return {
          [property]: messages,
        };
      });
    } else {
      return true;
    }
  } catch (err) {
    console.error(err);
  }
}
