import "../../../service/node_modules/source-map-support/register";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";
import * as AWS from "aws-sdk";
import { createLogger } from "../../../utils/logger";
import { UserService } from "../../../service/user.service";

AWS.config.update({ region: "ap-southeast-1" });
const logger = createLogger("create todo");

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const todoObj = UserService.create(event, logger);
    return {
      statusCode: 200,
      body: JSON.stringify(todoObj),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
  } catch (err) {
    logger.error(`fail to create item`, err);
  }
};

/**
 *  CreateUser:
    handler: src/lambda/http/createUser.handler
    events:
      - http:
          method: post
          path: users
          cors: true
          authorizer: Auth
          reqValidatorName: RequestBodyValidator
          documentation:
            summary: Create a new todo item
            description: Create a new todo item
            requestModels:
              'application/json': CreateUserReq
    iamRoleStatements:
      - Effect: Allow
        Action:
          - dynamodb:PutItem
        Resource: arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.TODOS_TABLE}
 */
