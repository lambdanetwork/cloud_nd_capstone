import { CreateUserDTO } from "../lambda/http/users/DTO/createUserDTO";
import { validateObj } from "../utils/validateObj";

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
