import "source-map-support/register";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";
import * as AWS from "aws-sdk";
import { createLogger } from "../../../utils/logger";
import { getUserId } from "../../utils";
import { sanitizeResponseBody } from "../../../utils/http/sanitizeResponse";
import { ClassSessionService } from "../../../service/class.service";

AWS.config.update({ region: "ap-southeast-1" });
const logger = createLogger("get class by query in POST body");

/**  */
export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const userId = getUserId(event);
    // const classSessionBody: CreateClassSessionDTO =
      // typeof event.body === "string" ? JSON.parse(event.body) : event.body;

    // // validate request body, if error return
    // const errorValidateBody = await validateBodyRequest(
    //   event,
    //   CreateClassSessionDTO
    // );
    // if (!!errorValidateBody) return errorValidateBody;

    // if no error
    const result = await ClassSessionService.get(
      userId,
      logger
    );
    sanitizeResponseBody(result);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
  } catch (err) {
    logger.error(`fail to create item`, err);
  }
};
