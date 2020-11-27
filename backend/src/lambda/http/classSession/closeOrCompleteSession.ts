import "source-map-support/register";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler,
} from "aws-lambda";
import { createLogger } from "../../../utils/logger";
import { getUserId } from "../../utils";
import { ClassSessionService } from "../../../service/class.service";
import { CloseClassDTO } from "./DTO/closeClassDTO";
import { validateBodyRequest } from "../../../utils/http/validateBodyRequest";
import { CompleteClassDTO } from "./DTO/CompleteClassDto";

const loggerClose = createLogger("close class-session");
const loggerComplete = createLogger("close complete-session");

/**
 * Close can be done by tutor or student
 */
export const close: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const userId = getUserId(event);
    const classSessionBody: CloseClassDTO =
      typeof event.body === "string" ? JSON.parse(event.body) : event.body;

    // validate request body, if error return
    const errorValidateBody = await validateBodyRequest(event, CloseClassDTO);
    if (!!errorValidateBody) return errorValidateBody;

    const result = await ClassSessionService.close(
      userId,
      classSessionBody,
      loggerClose
    );

    return {
      statusCode: 200,
      body: String(result),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
  } catch (err) {
    loggerClose.error(err);
  }
};

/**
 * Complete can be done student
 */
export const complete: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const userId = getUserId(event);
    const classSessionBody: CompleteClassDTO =
      typeof event.body === "string" ? JSON.parse(event.body) : event.body;

    // validate request body, if error return
    const errorValidateBody = await validateBodyRequest(
      event,
      CompleteClassDTO
    );
    if (!!errorValidateBody) return errorValidateBody;

    const result = await ClassSessionService.complete(
      userId,
      classSessionBody,
      loggerComplete
    );

    return {
      statusCode: 200,
      body: String(result),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
  } catch (err) {
    loggerComplete.error(err);
  }
};
