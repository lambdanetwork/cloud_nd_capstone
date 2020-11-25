import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { UserType } from "../../../../models/user.model";

export class CreateUserDTO {
  // from auth0
  @IsNotEmpty()
  username: string;
  @IsEmail()
  @IsNotEmpty()
  emailMain: string;
  emailMainVerified: boolean = false;

  @IsOptional()
  emailSecondary?: string[];

  // tenant: string;
  @IsOptional()
  phoneNumber?: string;
  @IsOptional()
  phoneNumberVerified?: boolean;

  studentDetailId?: string;
  tutorDetailId?: string;
  @IsNotEmpty()
  type: UserType;
  @IsOptional()
  photo?: string;
}
