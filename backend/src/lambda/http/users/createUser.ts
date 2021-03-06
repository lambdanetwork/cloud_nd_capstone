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
import { validateBodyRequest } from "../../../utils/http/validateBodyRequest";
import { CreateUserDTO } from "./DTO/createUserDTO";
import { sanitizeResponseBody } from "../../../utils/http/sanitizeResponse";

AWS.config.update({ region: "ap-southeast-1" });
const logger = createLogger("create user ");

/**
 */
export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const userId = getUserId(event);
    const userProfileReq: CreateUserDTO =
      typeof event.body === "string" ? JSON.parse(event.body) : event.body;

    // validate request body, if error return
    const errorValidateBody = await validateBodyRequest(event, CreateUserDTO);
    if (!!errorValidateBody) return errorValidateBody;

    // if no error
    const user = await UserService.create(userId, userProfileReq, logger);
    sanitizeResponseBody(user);

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
