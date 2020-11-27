export class TutorDetail {
  userId: string;
  tutorId: string;
  isDeleted: boolean;

  currentOrganization: string;
  workExperience: {
    [key: string]: any;
  };
  IDNumber: string; // tutor must have ID number
  school: string;
  educationLevel: string;
  scheduledSession: Set<{
    sessionId: string;
    startTime: number;
    endTime: number;
  }>;
  requestSession?: unknown;
  Session: Set<string>; // Set<session-id>
  sessionHistory: {
    [key: string]: {
      // key is session-id
      sessionId: string;
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
