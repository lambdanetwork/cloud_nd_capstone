export interface CreateUserReq {
  // name: string;
  // age: string;
  // auth0 user
  id: string;
  email: string;
  username: string;
  emailVerified: boolean;
  phoneNumber: string;
  phoneNumberVerified: boolean;
}
