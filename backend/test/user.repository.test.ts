// import { UserType } from "../src/models/user.model";
import { UserRepository } from "../src/repository/user.repository";

// UserRepository.getUserById("google-oauth2|117753080557199688487").then(
//   console.log
// );
// UserRepository.getUserById("google-oauth2|117753080557199688487").then(
//   console.log
// );
// UserRepository.create({
//   userId: "google-oauth2|117753080557199688487",
//   emailMain: "alfredovidy@gmail.com",
//   username: "icevube",
//   emailMainVerified: true,
//   emailSecondary: [],
//   phoneNumber: "1234",
//   phoneNumberVerified: false,
//   photo: "",
//   isDeleted: false,
//   paymentId: null,
//   userType: "1000" as UserType,
//   updatedAt: 1605959487055,
//   createdAt: 1605959487055,
// });
const tutors = UserRepository.getTutors();
tutors.then(console.log);
