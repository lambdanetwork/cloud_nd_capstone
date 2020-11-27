import "source-map-support/register";

import { APIGatewayProxyResult, APIGatewayProxyHandler } from "aws-lambda";

import { createLogger } from "../../../utils/logger";
import { UserService } from "../../../service/user.service";
import { sanitizeResponseBody } from "../../../utils/http/sanitizeResponse";

const logger = createLogger("get tutors");

export const handler: APIGatewayProxyHandler = async (): // event: APIGatewayProxyEvent
Promise<APIGatewayProxyResult> => {
  try {
    const tutors = await UserService.getTutors(logger);

    // sanitize response.body
    sanitizeResponseBody(tutors);

    return {
      statusCode: 200,
      body: JSON.stringify(tutors),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
  } catch (error) {
    logger.error(`fail to get tutors`, error);
  }
};
