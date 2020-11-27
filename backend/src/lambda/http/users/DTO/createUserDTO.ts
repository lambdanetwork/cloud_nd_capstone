import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { UserType } from "../../../../models/user.model";

export class CreateUserDTO {
  // from auth0
  @IsNotEmpty()
  username: string;
  @IsEmail()
  @IsNotEmpty()
  emailMain: string;

  @IsOptional()
  emailSecondary?: string[];

  // tenant: string;
  @IsOptional()
  phoneNumber?: string;

  studentDetailId?: string;
  tutorDetailId?: string;
  @IsNotEmpty()
  type: UserType;
  @IsOptional()
  photo?: string;
}
