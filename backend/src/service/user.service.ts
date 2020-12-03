import "source-map-support/register";

import { Logger } from "winston";
import { User, UserType } from "../models/user.model";
import { v4 as uuidv4 } from "uuid";
import { UserRepository } from "../repository/user.repository";
import { loggerRunP, NothingP } from "../utils/loggerRun";
import { CreateUserDTO } from "../lambda/http/users/DTO/createUserDTO";
import { UpdateUserDTO } from "../lambda/http/users/DTO/updateProfileDTO";

// const bucketName = process.env.TODO_IMAGES_S3_BUCKET;

export class UserService {
  static async getTutors(logger: Logger) {
    return loggerRunP(null, logger)
      .map(async () => {
        logger.info(`get tutors with query`);
        const items = await UserRepository.getTutors();
        return items;
      })
      .flat();
  }

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
   */
  static async create(
    userId: string,
    userDTO: CreateUserDTO,
    logger: Logger
  ): Promise<User> {
    // parse request body

    const newUser: User = {
      userId: userId,
      emailMain: userDTO.emailMain,
      emailMainVerified: false,
      username: userDTO.username,
      emailSecondary: [],
      phoneNumber: userDTO.phoneNumber,
      phoneNumberVerified: false,
      paymentId: "",
      isDeleted: false,
      userType: userDTO.type,
      updatedAt: Date.now(),
      createdAt: Date.now(),
    };

    const paymentId = "P-" + new uuidv4();
    newUser.paymentId = paymentId;

    const id = new uuidv4();
    if (userDTO.type === UserType.STUDENT) {
      newUser.studentDetailId = id;
    } else if (userDTO.type === UserType.TUTOR) {
      newUser.tutorDetailId = id;
    }

    // think of conccurent execution with Promise.all
    const isDone = loggerRunP(newUser, logger)
      .map(async () => {
        logger.info(`Creating user with params ${JSON.stringify(newUser)}`);
        const items = await UserRepository.create(newUser);
        return items;
      })
      // .map(async () => {
      //   logger.info(`Creating student or tutor table with params ${newUser}`);
      //   if (userDTO.type === UserType.STUDENT) {
      //     await StudentRepository.create(userId, id);
      //   } else if (userDTO.type === UserType.TUTOR) {
      //     await TutorRepository.create(userId, id);
      //   }
      // })
      // .map(async () => {
      //   logger.info(`Creating payment table with params ${newUser}`);
      //   await PaymentRepository.create(userId, paymentId);
      // })
      .flat();

    return (await isDone) instanceof NothingP ? null : newUser;
  }

  static async updateProfile(
    userId: string,
    userReq: UpdateUserDTO,
    logger: Logger
  ): Promise<User> {
    logger.info(`Updating user ${userId} with params ${userReq}`);
    return await UserRepository.updateProfile(userId, userReq);
  }

  static async updateUserType(
    userId: string,
    userType: UserType,
    logger: Logger
  ): Promise<boolean> {
    const updateUser = {
      userType,
      updatedAt: Date.now(),
    };

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
    // const photoUrl: string =
    //   "https://" + bucketName + ".s3.amazonaws.com/" + imageId;

    return loggerRunP(userId, logger)
      .map(async (userId) => {
        logger.info(
          `trying to get upload url userID: ${userId}, imageId: ${userId}`
        );
        return await UserRepository.getUploadPhotoUrl(userId);
      })
      .flat();
  }
}
