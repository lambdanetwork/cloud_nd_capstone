import "source-map-support/register";

import { Logger } from "winston";
import { User } from "../models/user.model";
import { CreateUserReq } from "../requests/user/createUser.request";
import {
  UpdateProfileReq,
  UpdateUserTypeReq,
} from "../requests/user/updateProfileRequest";
import { v4 as uuidv4 } from "uuid";
import { UserRepository } from "../repository/user.repository";
import { loggerRunP } from "../utils/loggerRun";
//
// const bucketName = process.env.TODO_IMAGES_S3_BUCKET;

export class UserService {
  static async getUserById(userId: string, logger: Logger): Promise<User> {
    // logger.info(`get item with userId ${userId}`);
    // const items = await UserRepository.getUserById(userId);
    // return items[0];
    return loggerRunP(userId, logger)
      .map(async () => {
        logger.info(`get item with userId ${userId}`);
        const items = await UserRepository.getUserById(userId);
        return items[0];
      })
      .flat();
  }

  /**
   * This function will be triggered by auth0 hook, post-registration
   */
  static async create(
    userId: string,
    userAuth0: CreateUserReq,
    logger: Logger
  ): Promise<User> {
    // parse request body

    const newUser: User = {
      userId: userId,
      emailMain: userAuth0.email,
      username: userAuth0.username,
      Session: new Set(),
      age: 0,
      name: "",
      school: "",
      address: "",
      emailMainVerified: userAuth0.emailVerified,
      emailSecondary: [],
      phoneNumber: userAuth0.phoneNumber,
      phoneNumberVerified: userAuth0.phoneNumberVerified,
      photo: "",
      isClosed: false,
      isDeleted: false,
      payment: null,
      sessionHistory: {},
      type: 1000,
      updatedAt: Date.now(),
      createdAt: Date.now(),
    };

    return loggerRunP(newUser, logger)
      .map(async () => {
        logger.info(`Creating user with params ${newUser}`);
        const items = await UserRepository.create(newUser);
        return items;
      })
      .flat();
  }

  static async updateProfile(
    userId: string,
    userReq: UpdateProfileReq,
    logger: Logger
  ): Promise<User> {
    const updateUser: UpdateProfileReq = userReq;

    logger.info(`Updating user ${userId} with params ${updateUser}`);
    return await UserRepository.updateProfile(userId, updateUser);
  }

  static async updateUserType(
    userId: string,
    updateUserTypeReq: UpdateUserTypeReq,
    logger: Logger
  ): Promise<boolean> {
    const updateUser: UpdateUserTypeReq = updateUserTypeReq;

    logger.info(
      `Updating user type with params userId: ${userId}, type: ${updateUser}`
    );
    return UserRepository.updateUserType(userId, updateUser);
  }

  static async deleteTodo(userId: string, logger: Logger): Promise<boolean> {
    return loggerRunP(userId, logger)
      .map(async (userId) => {
        logger.info(`Deleting item with user:${userId} `);
        return await UserRepository.delete(userId);
      })
      .flat();
  }

  static async generateUploadPhotoUrl(userId: string, logger: Logger) {
    const imageId = uuidv4();

    // const photoUrl: string =
    //   "https://" + bucketName + ".s3.amazonaws.com/" + imageId;

    return loggerRunP(userId, logger)
      .map(async (userId) => {
        logger.info(
          `trying to get upload url userID: ${userId}, imageId: ${imageId}`
        );
        return await UserRepository.getUploadPhotoUrl(imageId);
      })
      .flat();
  }
}
