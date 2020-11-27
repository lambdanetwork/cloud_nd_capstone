import { User, UserType } from "../models/user.model";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import * as AWS from "aws-sdk";
import * as AWSXRay from "aws-xray-sdk";
import { v4 as uuidv4 } from "uuid";

AWS.config.update({ region: "ap-southeast-1" });

const ddbDocumentClient = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.USER_TABLE;

export class UserRepository {
  static async getTutors() {
    const params = {
      TableName,
      IndexName: "userTypeIndex",
      KeyConditionExpression: "userType = :userType",
      ExpressionAttributeValues: {
        ":userType": UserType.TUTOR,
      },
      ScanIndexForward: false,
    };
    const result = await ddbDocumentClient.query(params).promise();
    return result.Items as User[];
  }
  static async updateUserType(
    userId: string,
    updateUser: any
  ): Promise<boolean> {
    updateUser.updatedAt = Date.now();

    const params: DocumentClient.UpdateItemInput = {
      TableName,
      Key: {
        userId,
      },
      ...createUpdateQueryByObject(updateUser),
      ReturnValues: "UPDATED_NEW",
    };
    console.log("query", createUpdateQueryByObject(updateUser));

    await ddbDocumentClient.update(params).promise();
    return true;
  }
  static async updateProfile(userId: string, updateUser: any): Promise<User> {
    updateUser.updatedAt = Date.now();

    const params: DocumentClient.UpdateItemInput = {
      TableName,
      Key: {
        userId,
      },
      ...createUpdateQueryByObject(updateUser),
      ReturnValues: "UPDATED_NEW",
    };
    console.log("query", createUpdateQueryByObject(updateUser));

    const item = await ddbDocumentClient.update(params).promise();
    if (!item) throw new Error("Failed to update");
    return item.$response.data as User;
  }

  static async getUserById(userId: string): Promise<User[]> {
    const params = {
      TableName,
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": userId,
      },
    };
    const result = await ddbDocumentClient.query(params).promise();
    return result.Items as User[];
  }

  static async create(newUser: User): Promise<User> {
    delete newUser.emailSecondary;
    delete newUser.paymentId;
    delete newUser.photo;

    const params = {
      TableName,
      Item: newUser,
    };

    await ddbDocumentClient.put(params).promise();
    return newUser;
  }

  static async delete(userId: string): Promise<boolean> {
    const updatedAt = Date.now();
    try {
      const params: DocumentClient.UpdateItemInput = {
        TableName,
        Key: {
          userId,
        },
        UpdateExpression:
          "set #isDeleted = :isDeleted, #updatedAt = :updatedAt",
        ExpressionAttributeValues: {
          ":isDeleted": true,
          ":updatedAt": updatedAt,
        },
        ExpressionAttributeNames: {
          "#isDeleted": "isDeleted",
          "#updatedAt": "updatedAt",
        }, // ReturnValues: "UPDATED_NEW",
      };
      console.log(params);
      await ddbDocumentClient.update(params).promise();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
  static async getUploadPhotoUrl(userId: string): Promise<string> {
    const XAWS = AWSXRay.captureAWS(AWS);
    const imageId = userId + uuidv4().slice(0, 5);

    const s3 = new XAWS.S3({
      signatureVersion: "v4",
      region: process.env.REGION,
    });

    const bucketName = process.env.USER_IMAGES_S3_BUCKET;
    const urlExpiration = process.env.SIGNED_URL_EXPIRATION;

    function getUploadUrl(imageId: string) {
      return s3.getSignedUrl("putObject", {
        Bucket: bucketName,
        Key: imageId,
        Expires: urlExpiration,
      });
    }

    // update user table with new image address to avoid browser-cache
    const photoUrl: string =
      "https://" + bucketName + ".s3.amazonaws.com/" + imageId;
    const options = {
      TableName,
      Key: {
        userId: userId,
      },
      UpdateExpression: "set photo = :r",
      ExpressionAttributeValues: {
        ":r": photoUrl,
      },
      ReturnValues: "UPDATED_NEW",
    };
    await ddbDocumentClient.update(options).promise();

    const url = getUploadUrl(imageId);
    return url;
  }
}

// helper
function createUpdateQueryByObject(obj: { [key: string]: any }) {
  let UpdateExpression = "set ";
  const ExpressionAttributeValues = {};
  const ExpressionAttributeNames = {};
  Object.keys(obj).map((key, index, arr) => {
    const value = obj[key];
    const keyString = `#${key}`;
    const valueString = `:${key}`;

    UpdateExpression += `${keyString} = ${valueString}`;
    if (index !== arr.length - 1) {
      // don't adding comma if UpdateExpression is last
      UpdateExpression += ",";
    }

    ExpressionAttributeValues[valueString] = value;
    ExpressionAttributeNames[keyString] = key;
  });

  return {
    UpdateExpression,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
  };
}
