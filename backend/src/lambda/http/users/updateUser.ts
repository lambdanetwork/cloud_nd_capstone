import "../../../service/node_modules/source-map-support/register";

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
    const userId = getUserId(event);
    const type = Number(event.queryStringParameters.user_type) as UserType;

    await UserService.updateUserType(userId, { type }, logger);
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
