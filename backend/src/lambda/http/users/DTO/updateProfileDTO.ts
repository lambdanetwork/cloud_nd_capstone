import { IsNotEmpty, IsOptional } from "class-validator";
import { UserType } from "../../../../models/user.model";

export class UpdateUserDTO {
  @IsNotEmpty()
  username: string;

  @IsOptional()
  emailSecondary?: string[];
  emailMainVerified: boolean = false;

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
