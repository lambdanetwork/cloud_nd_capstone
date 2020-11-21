import { User } from "../../models/user.model";

export type UpdateProfileReq = Pick<
  User,
  | "username"
  | "age"
  | "name"
  | "school"
  | "address"
  | "emailSecondary"
  | "phoneNumber"
  | "phoneNumberVerified"
  | "photo"
>;

export type UpdateUserTypeReq = Pick<User, "type">;
