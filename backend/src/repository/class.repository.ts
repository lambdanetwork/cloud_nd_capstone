import { ClassSession } from "../models/class.model";
import * as AWS from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import * as AWSXRay from "aws-xray-sdk";
const XAWS = AWSXRay.captureAWS(AWS);
const TABLE_NAME = process.env.CLASS_TABLE;
AWS.config.update({ region: "ap-southeast-1" });
const ddbDocumentClient = new DocumentClient();
const bucketName = process.env.CLASS_IMAGES_S3_BUCKET;
const urlExpiration = process.env.SIGNED_URL_EXPIRATION;

export class ClassRepository {
  // static async getByUserId(userId): Promise<Class[]> {}

  static async getByClassId(classId): Promise<ClassSession[]> {
    const params = {
      TableName: TABLE_NAME,
      KeyConditionExpression: "classId = :classId",
      ExpressionAttributeValues: {
        ":classId": classId,
      },
    };
    const result = await ddbDocumentClient.query(params).promise();
    return result.Items as ClassSession[];
  }

  static async createClass(classSession: ClassSession): Promise<ClassSession> {
    const attachmentUrl: string =
      "https://" + bucketName + ".s3.amazonaws.com/" + classSession.classId;
    classSession.imageQuestion = attachmentUrl;

    const params = {
      TableName: TABLE_NAME,
      Item: classSession,
    };

    await ddbDocumentClient.put(params).promise();
    return classSession;
  }

  // static async updateClass(item: ClassSession): Promise<ClassSession> {
  //   const { userId, todoId } = item;
  //   const params: DocumentClient.UpdateItemInput = {
  //     TableName: TABLE_NAME,
  //     Key: {
  //       todoId,
  //       userId,
  //     },
  //     UpdateExpression: "set #name = :name, #dueDate = :duedate, #done = :done",
  //     ExpressionAttributeValues: {
  //       ":name": todo.name,
  //       ":duedate": todo.dueDate,
  //       ":done": todo.done,
  //     },
  //     ExpressionAttributeNames: {
  //       "#name": "name",
  //       "#dueDate": "dueDate",
  //       "#done": "done",
  //     },
  //     ReturnValues: "UPDATED_NEW",
  //   };
  //   const item = await ddbDocumentClient.update(params).promise();
  //   if (!item) throw new Error("Failed to update");
  //   return item.$response.data as TodoItem;
  // }

  static async deleteTodo(todoId: string, userId: string): Promise<boolean> {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        todoId,
        userId,
      },
    };

    await ddbDocumentClient.delete(params).promise();
    return true;
  }

  static async generateUploadUrl(classId: string): Promise<string> {
    const s3 = new XAWS.S3({
      signatureVersion: "v4",
      region: process.env.REGION,
    });

    function getUploadUrl(classId: string) {
      return s3.getSignedUrl("putObject", {
        Bucket: bucketName,
        Key: classId,
        Expires: urlExpiration,
      });
    }
    const url = getUploadUrl(classId);
    return url;
  }
}
