import "source-map-support/register";

import { ClassSession } from "../models/class.model";

// const bucketName = process.env.TODO_IMAGES_S3_BUCKET;

export class ClassSessionService {
  static create(userId, classSessionBody, logger): Promise<ClassSession> {
    console.log(userId, classSessionBody, logger);
    // @ts-ignore
    return Promise.resolve() as ClassSession;
  }
}
