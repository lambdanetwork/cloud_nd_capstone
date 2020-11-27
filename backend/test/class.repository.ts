import { ClassRepository } from "../src/repository/class.repository";

ClassRepository.createClass({
  classId: "1234",
  createdAt: Date.now(),
  endTime: Date.now(),
  imageQuestion: "https://asdf",
  startTime: Date.now(),
  status: 0,
  studentId: "12234",
  studentUserId: "asdf",
  tutorId: "asdf",
  tutorUserId: "asdf",
  updatedAt: Date.now(),
});
