import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { UserType } from "../../../../models/user.model";

export class CreateUserDTO {
  // from auth0
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  username: string;
  @IsEmail()
  @IsNotEmpty()
  emailMain: string;

  @IsOptional()
  emailSecondary?: string[];
  emailMainVerified: boolean = false;
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
