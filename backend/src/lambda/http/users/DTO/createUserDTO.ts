import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { UserType } from "../../../../models/user.model";

export class CreateUserDTO {
  @IsOptional()
  userId: string;

  // from auth0
  @IsOptional() @IsNotEmpty()
  username: string;

  @IsOptional() 
  @IsEmail()
  @IsNotEmpty()
  emailMain: string;

  @IsOptional()
  emailSecondary?: string[];

  // tenant: string;
  @IsOptional()
  phoneNumber?: string;

  @IsOptional() 
  studentDetailId?: string;

  @IsOptional() 
  tutorDetailId?: string;
  
  @IsNotEmpty()
  type: UserType;
  
  @IsOptional()
  photo?: string;
}
