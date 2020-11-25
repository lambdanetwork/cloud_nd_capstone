import { IsNotEmpty } from "class-validator";

export class CreateClassSessionDTO {
  // from auth0
  @IsNotEmpty()
  studentUserId: string;
  @IsNotEmpty()
  studentId: string;
  @IsNotEmpty()
  tutorUserId: string;
  @IsNotEmpty()
  tutorId: string;
}
