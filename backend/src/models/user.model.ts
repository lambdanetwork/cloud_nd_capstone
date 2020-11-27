export enum UserType {
  ADMIN = 9000,
  STUDENT = 1000,
  PARENT = 1010,
  TUTOR = 1020,
}

export class User {
  // from auth0
  userId: string;
  username: string;
  emailMain: string;
  emailSecondary: string[];
  emailMainVerified: boolean;
  // tenant: string;
  phoneNumber: string;
  phoneNumberVerified: boolean;

  isDeleted: boolean;

  studentDetailId?: string;
  tutorDetailId?: string;
  type: UserType;

  photo?: string;
  paymentId: string; //paymentID

  // time
  updatedAt: number;
  createdAt: number; // timestamp
}
