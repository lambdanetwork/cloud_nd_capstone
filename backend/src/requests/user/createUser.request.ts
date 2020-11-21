export interface CreateUserReq {
  name: string;
  age: string;
  userAuth0: {
    // auth0 user
    id: string;
    email: string;
    username: string;
    emailVerified: boolean;
    phoneNumber: string;
    phoneNumberVerified: boolean;
  };
}
