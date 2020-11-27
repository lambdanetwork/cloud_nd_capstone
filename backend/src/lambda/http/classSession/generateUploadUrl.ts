import "source-map-support/register";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler,
} from "aws-lambda";
import { createLogger } from "../../../utils/logger";
import { getUserId } from "../../utils";
import { ClassSessionService } from "../../../service/class.service";
import { GenerateUploadUrlDTO } from "./DTO/GenerateUploadUrlDTO";
import { validateBodyRequest } from "../../../utils/http/validateBodyRequest";

const logger = createLogger("generate user signed url ");

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const userId = getUserId(event);
    const generateBody: GenerateUploadUrlDTO =
      typeof event.body === "string" ? JSON.parse(event.body) : event.body;

    // validate request body, if error return
    const errorValidateBody = await validateBodyRequest(
      event,
      GenerateUploadUrlDTO
    );
    if (!!errorValidateBody) return errorValidateBody;

    const url = await ClassSessionService.generateUploadPhotoUrl(
      userId,
      generateBody.classId,
      logger
    );

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
