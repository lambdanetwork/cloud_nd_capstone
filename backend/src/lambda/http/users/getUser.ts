import "source-map-support/register";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler,
} from "aws-lambda";

import { createLogger } from "../../../utils/logger";
import { UserService } from "../../../service/user.service";
import { getUserId } from "../../utils";

const logger = createLogger("getUserById");

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const userId = getUserId(event);
    const user = await UserService.getUserById(userId, logger);

    if (user && user.isDeleted) {
      //
    }

    // sanitize response.body
    delete user.isDeleted;
    delete user.createdAt;
    delete user.isClosed;

    return {
      statusCode: 200,
      body: JSON.stringify(user),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
  } catch (error) {
    logger.error(`fail to get todo item`);
  }
};
