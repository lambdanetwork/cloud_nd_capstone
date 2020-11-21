import "../../../service/node_modules/source-map-support/register";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler,
} from "aws-lambda";
import { createLogger } from "../../../utils/logger";
import { UserService } from "../../../service/user.service";
import { getUserId } from "../../utils";

const logger = createLogger("generate user signed url ");

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const userId = getUserId(event);

    const url = UserService.generateUploadPhotoUrl(userId, logger);
    return {
      statusCode: 200,
      body: JSON.stringify({
        uploadUrl: url,
      }),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
  } catch (err) {
    logger.error("failed to get signed url", err);
  }
};
