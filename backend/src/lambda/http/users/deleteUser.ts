import "source-map-support/register";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler,
} from "aws-lambda";
import { createLogger } from "../../../utils/logger";
import { UserRepository } from "../../../repository/user.repository";
import { getUserId } from "../../utils";

const logger = createLogger("delete user");

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const userId = getUserId(event);
    const result = await UserRepository.delete(userId);

    return {
      statusCode: 200,
      body: String(result),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
  } catch (err) {
    logger.error(err);
  }
};
