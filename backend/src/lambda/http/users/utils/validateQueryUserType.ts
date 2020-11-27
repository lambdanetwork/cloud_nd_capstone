import { UserType } from "../../../../models/user.model";

export function validateQueryUserType(event: {
  queryStringParameters: { [key: string]: any };
}) {
  const type = event.queryStringParameters
    ? String(event.queryStringParameters.user_type)
    : null;
  const isValidType =
    type &&
    type !== UserType.ADMIN &&
    Object.keys(UserType).indexOf(String(type)) >= 0;

  return isValidType ? type : null;
}
