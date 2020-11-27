import { CreateUserDTO } from "../../src/lambda/http/users/DTO/createUserDTO";
import { validateObj } from "../../src/utils/validateObj";

const result = validateObj<any>(
  {
    userId: "asdf",
    username: "asdf",
    emailMainVerified: false,
    emailMain: "",
    type: 1010,
  },
  CreateUserDTO
);
result.then(console.log);
