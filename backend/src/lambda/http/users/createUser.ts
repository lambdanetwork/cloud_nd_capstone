import "source-map-support/register";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";
import * as AWS from "aws-sdk";
import { createLogger } from "../../../utils/logger";
import { UserService } from "../../../service/user.service";
import { getUserId } from "../../utils";
import { CreateUserReq } from "../../../requests/user/createUser.request";

AWS.config.update({ region: "ap-southeast-1" });
const logger = createLogger("create user ");

/**
 * To be called by auth0
 */
export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const userId = getUserId(event);
    const userProfileReq: CreateUserReq =
      typeof event.body === "string" ? JSON.parse(event.body) : event.body;

    const user = await UserService.create(userId, userProfileReq, logger);
    return {
      statusCode: 200,
      body: JSON.stringify(user),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
  } catch (err) {
    logger.error(`fail to create item`, err);
  }
};
