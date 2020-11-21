import { User } from "../models/user.model";
import {
  UpdateProfileReq,
  UpdateUserTypeReq,
} from "../requests/user/updateProfileRequest";

interface IUserRepository {
  getUploadPhotoUrl(imageId: string): Promise<string>;
  updateUserType(
    userId: string,
    updateUser: UpdateUserTypeReq
  ): Promise<boolean>;
  updateProfile(userId: string, updateUser: UpdateProfileReq): Promise<boolean>;
  getTodoByUserId(userId: string): Promise<User>;
  create(newUser: User): Promise<User>;
  delete(userId: string): Promise<boolean>;
}

export const UserRepository: IUserRepository = class {
  static async getUploadPhotoUrl(imageId: string): Promise<string> {
    return imageId;
  }
  static async updateUserType(
    userId: string,
    updateUser: UpdateUserTypeReq
  ): Promise<boolean> {
    console.log(userId, updateUser);
    return false;
  }
  static async updateProfile(
    userId: string,
    updateUser: UpdateProfileReq
  ): Promise<boolean> {
    console.log(userId, updateUser);
    return false;
  }
  static async getTodoByUserId(userId: string): Promise<User> {
    console.log(userId);
    return;
  }
  static async create(newUser: User): Promise<User> {
    return newUser;
  }
  static async delete(userId: string): Promise<boolean> {
    console.log(userId);

    return false;
  }
};
