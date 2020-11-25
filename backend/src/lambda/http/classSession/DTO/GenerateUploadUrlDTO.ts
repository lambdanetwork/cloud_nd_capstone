import { IsNotEmpty } from "class-validator";

export class GenerateUploadUrlDTO {
  // from auth0
  @IsNotEmpty()
  classId: string;
}
