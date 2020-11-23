import { createLogger } from "../utils/logger";
import { UserService } from "./user.service";

const logger = createLogger("test logger");
UserService.getUserById(
  "google-oauth2|117753080557199688487",
  logger
).then((res) => console.log("result", res));
UserService.create(
  "11775308055487",
  {
    id: "11775308055487",
    email: "alfredovidy@gmail.com",
    username: "icevube",
    phoneNumber: "1234",
    phoneNumberVerified: false,
    emailVerified: false,
  },
  logger
).then(console.log);
