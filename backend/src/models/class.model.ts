export type classId = string;
export type userId = string;
export type tutorId = string;

export class Class {
  classId: string;
  studentId: string;
  tutorId: string;
  imageQuestion: string;
  status: 0 | 1 = 0;
  ratingFromStudent?: 1 | 2 | 3 | 4 | 5;
  completedAt?: number;
  chat?: Array<{
    chatId: string;
    author: userId | tutorId;
    content: string; //body of chat
    createdAt: number;
    replyToChatId: string;
  }>;
  startTime: number;
  endTime: number;
  frequency?: string;
  numberOfSession?: string;
  durationPerClass?: number; // in millisecond
  classSchedule?: string;

  history?: {
    [key: string]: any; // studentJoin, tutorJoin, etc
  };

  // time
  updatedAt: number;
  createdAt: number; // timestamp
}
