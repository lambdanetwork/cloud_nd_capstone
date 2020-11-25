import { createLogger } from "../src/utils/logger";
import { UserService } from "../src/service/user.service";

const logger = createLogger("test logger");
UserService.getUserById(
  "google-oauth2|117753080557199688487",
  logger
).then((res) => console.log("result", res));
UserService.create(
  "11775308055487",
  {
    emailMain: "alfredovidy@.com",
    username: "",
    phoneNumber: "1234",
    phoneNumberVerified: false,
    emailMainVerified: false,
    type: 1000,
  },
  logger
).then(console.log);
