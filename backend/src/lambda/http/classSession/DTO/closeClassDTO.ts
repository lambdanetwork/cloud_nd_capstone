import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CloseClassDTO {
  // from auth0
  @IsOptional()
  studentUserId: string;
  @IsOptional()
  studentId: string;
  @IsOptional()
  tutorUserId: string;
  @IsOptional()
  tutorId: string;

  @IsNotEmpty()
  classId: string;
  @IsString()
  reason: string;
}
