import { sessionId } from "./session.model";
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
  isClosed: boolean;
  name: string;
  age: number;
  school: string;
  address: string;
  photo: string;
  type: UserType;
  payment: string; //paymentID
  Session: Set<sessionId>; // Set<session-id>
  sessionHistory: {
    [key: string]: {
      // key is session-id
      sessionId: sessionId;
      studentId: string;
      tutorId: string;
      ratingFromStudent: 1 | 2 | 3 | 4 | 5;
      createdAt: number;
      completedAt: number;
    };
  };

  // time
  updatedAt: number;
  createdAt: number; // timestamp
}
