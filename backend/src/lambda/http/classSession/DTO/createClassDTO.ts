import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateClassSessionDTO {
  // from auth0
  @IsNotEmpty()
  @IsOptional()
  studentUserId: string;

  @IsNotEmpty()
  @IsOptional()
  studentId: string;

  @IsNotEmpty()
  @IsOptional()
  tutorUserId: string;

  @IsNotEmpty()
  @IsOptional()
  tutorId: string;

  @IsNotEmpty()
  imageQuestion: string;

  @IsNotEmpty()
  classId: string;
}
