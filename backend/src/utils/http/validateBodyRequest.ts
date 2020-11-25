import { APIGatewayProxyEvent } from "aws-lambda";
import { validateObj } from "../validateObj";

export async function validateBodyRequest<T>(
  event: APIGatewayProxyEvent,
  classFunction: { new (): T }
) {
  const body: T =
    typeof event.body === "string" ? JSON.parse(event.body) : event.body;

  const isValidated = await validateObj<T>(body, classFunction);
  if (isValidated === true) return false;

  return {
    statusCode: 400,
    body: JSON.stringify(isValidated),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };
}
