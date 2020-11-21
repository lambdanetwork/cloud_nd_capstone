export type sessionId = string;
export type userId = string;
export type tutorId = string;

export class Session {
  sessionId: sessionId;
  studentId: string;
  tutorId: string;
  ratingFromStudent: 1 | 2 | 3 | 4 | 5;
  completedAt: number;
  imageQuestion: string;
  chat: Array<{
    chatId: string;
    author: userId | tutorId;
    content: string; //body of chat
    createdAt: number;
    replyToChatId: string;
  }>;
  status: 0 | 1;

  // time
  updatedAt: number;
  createdAt: number; // timestamp
}
