import "source-map-support/register";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";
import { UserService } from "../../../service/user.service";
import { getUserId } from "../../utils";
import { UserType } from "../../../models/user.model";
import { createLogger } from "../../../utils/logger";

/**
 * user want to update his profile
 * cannot change email yet. email is permanent per user / account
 * maybe each user can have secondary emails for mailing purposes
 * but main email can't be changed
 */
export const updateProfile: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const logger = createLogger("update profile");
    const userId = getUserId(event);
    const userProfileReq =
      typeof event.body === "string" ? JSON.parse(event.body) : event.body;

    const item = await UserService.updateProfile(
      userId,
      userProfileReq,
      logger
    );

    return {
      statusCode: 200,
      body: JSON.stringify(item),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
  } catch (err) {
    console.error(err);
  }
};

export const updateUserType: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const logger = createLogger("update userType");
    const userType = validateUserType(event);
    if (!userType) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "invalid query user_type",
        }),
      };
    }
    const userId = getUserId(event);

    await UserService.updateUserType(userId, { type: userType }, logger);
    return {
      statusCode: 200,
      body: "",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
  } catch (err) {
    console.error(err);
  }
};

function validateUserType(event: {
  queryStringParameters: { [key: string]: any };
}) {
  const type = event.queryStringParameters
    ? Number(event.queryStringParameters.user_type)
    : null;
  const isValidType =
    type &&
    type !== UserType.ADMIN &&
    Object.keys(UserType).indexOf(String(type)) >= 0;

  return isValidType ? type : null;
}
