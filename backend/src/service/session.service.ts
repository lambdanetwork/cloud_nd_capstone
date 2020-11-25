import "source-map-support/register";
import { CloseClassDTO } from "../lambda/http/classSession/DTO/closeClassDTO";

import { ClassSession } from "../models/class.model";
import { loggerRunP, NothingP } from "../utils/loggerRun";

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
}
