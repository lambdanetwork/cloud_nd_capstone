import { UserRepository } from "./user.repository";

UserRepository.getUserById("google-oauth2|117753080557199688487").then(
  console.log
);
UserRepository.getUserById("google-oauth2|117753080557199688487").then(
  console.log
);
UserRepository.create({
  userId: "google-oauth2|117753080557199688487",
  emailMain: "alfredovidy@gmail.com",
  username: "icevube",
  Session: new Set(),
  age: 35,
  name: "vidy",
  school: "",
  address: "",
  emailMainVerified: true,
  emailSecondary: [],
  phoneNumber: "1234",
  phoneNumberVerified: false,
  photo: "",
  isClosed: false,
  isDeleted: false,
  payment: null,
  sessionHistory: {},
  type: 1000,
  updatedAt: 1605959487055,
  createdAt: 1605959487055,
});
