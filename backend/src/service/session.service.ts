import "source-map-support/register";
import { CloseClassDTO } from "../lambda/http/classSession/DTO/closeClassDTO";

import { ClassSession } from "../models/class.model";
import { UserRepository } from "../repository/user.repository";
import { loggerRunP, NothingP } from "../utils/loggerRun";
import { v4 as uuidv4 } from "uuid";

// const bucketName = process.env.TODO_IMAGES_S3_BUCKET;

export class ClassSessionService {
  static create(userId, classSessionBody, logger): Promise<ClassSession> {
    console.log(userId, classSessionBody, logger);
    // @ts-ignore
    return Promise.resolve() as ClassSession;
  }

  static async close(
    userId,
    classSessionDTO: CloseClassDTO,
    logger
  ): Promise<boolean> {
    // make user it's student or tutor that belongs to this classSession
    console.log(userId, classSessionDTO, logger);

    const isdone = loggerRunP(null, logger)
      .map(async () => {})
      .flat();

    if (isdone instanceof NothingP) return null;
    return true;
  }

  static async complete(
    userId,
    classSessionDTO: CloseClassDTO,
    logger
  ): Promise<boolean> {
    // make user it's student or tutor that belongs to this classSession
    console.log(userId, classSessionDTO, logger);

    const isdone = loggerRunP(null, logger)
      .map(async () => {})
      .flat();

    if (isdone instanceof NothingP) return null;
    return true;
  }

  static async generateUploadPhotoUrl(userId, classId, logger) {
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
