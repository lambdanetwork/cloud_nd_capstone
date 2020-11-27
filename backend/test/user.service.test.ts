import { createLogger } from "../src/utils/logger";
import { UserService } from "../src/service/user.service";

const logger = createLogger("test logger");
// UserService.getUserById(
//   "google-oauth2|117753080557199688487",
//   logger
// ).then((res) => console.log("result", res));
// UserService.create(
//   "11775308055487",
//   {
//     emailMain: "alfredovidy@.com",
//     username: "",
//     phoneNumber: "1234",
//     phoneNumberVerified: false,
//     emailMainVerified: false,
//     type: 1000,
//   },
//   logger
// ).then(console.log);
// process.env.USER_IMAGES_S3_BUCKET = "pintar-user-dev";
// process.env.SIGNED_URL_EXPIRATION = "pintar-class-dev";
// console.log(process.env.USER_IMAGES_S3_BUCKET);
// const result = UserService.generateUploadPhotoUrl(
//   "google-oauth2|117753080557199688487",
//   logger
// );

// result.then(console.log);
// USER_IMAGES_S3_BUCKET=pintar-user-dev SIGNED_URL_EXPIRATION=pintar-class-dev ts-node test/user.service.test.ts

UserService.getTutors(logger).then(console.log);
