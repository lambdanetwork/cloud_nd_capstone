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

const bucketName = process.env.TODO_IMAGES_S3_BUCKET;

export class UserService {
  static async getUserById(
    userId: string,
    logger: Logger
  ): Promise<{ Items: User }> {
    logger.info(`get item with userId ${userId}`);

    const items = await UserRepository.getTodoByUserId(userId);
    return { Items: items };
  }

  static async getTutors(event, logger) {}

  /**
   * This function will be triggered by auth0 hook, post-registration
   */
  static async create(
    userId: string,
    userReq: CreateUserReq,
    logger: Logger
  ): Promise<User> {
    // parse request body
    const { name, age, userAuth0 } = userReq;

    const newUser: User = {
      userId: userId,
      emailMain: userAuth0.email,
      username: userAuth0.username,
      Session: new Set(),
      age: Number(age),
      name,
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
    logger.info(`Creating user with params ${newUser}`);
    const createdUser = await UserRepository.create(newUser);

    return createdUser;
  }

  static async updateProfile(
    userId: string,
    userReq: UpdateProfileReq,
    logger: Logger
  ): Promise<boolean> {
    const updateUser: UpdateProfileReq & {
      userId?: string;
      updatedAt?: number;
    } = userReq;
    updateUser.userId = userId;
    updateUser.updatedAt = Date.now();

    logger.info(`Updating user with params ${updateUser}`);
    return await UserRepository.updateProfile(userId, updateUser);
  }

  static async updateUserType(
    userId: string,
    updateUserTypeReq: UpdateUserTypeReq,
    logger: Logger
  ): Promise<boolean> {
    const updateUser: UpdateUserTypeReq & {
      updatedAt?: number;
    } = updateUserTypeReq;
    updateUser.updatedAt = Date.now();

    logger.info(
      `Updating user type with params userId: ${userId}, type: ${updateUser}`
    );

    return await UserRepository.updateUserType(userId, updateUser);
  }

  static async deleteTodo(userId: string, logger: Logger): Promise<boolean> {
    logger.info(`Deleting item with user:${userId} `);

    return await UserRepository.delete(userId);
  }

  static async generateUploadPhotoUrl(userId: string, logger: Logger) {
    const imageId = uuidv4();

    // const photoUrl: string =
    //   "https://" + bucketName + ".s3.amazonaws.com/" + imageId;
    logger.info(
      `trying to get upload url userID: ${userId}, imageId: ${imageId}`
    );
    const url = UserRepository.getUploadPhotoUrl(imageId);

    return url;
  }
}
