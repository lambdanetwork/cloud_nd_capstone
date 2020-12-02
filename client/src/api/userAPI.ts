import Axios from "axios";
import { apiEndpoint, authConfig } from "../config/authConfig";
import jwtDecode, { JwtPayload } from "jwt-decode";

export default {
  async getUserByJWT() {
    try {
      const idToken = await localStorage.getItem("idToken");
      const response = await Axios.get(`${apiEndpoint}/users`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      });
      return response.data;
    } catch (err) {
      return null;
    }
  },

  async createUser(body: string) {
    try {
      const idToken = await localStorage.getItem("idToken");
      const response = await Axios.post(`${apiEndpoint}/users`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
          body,
        },
      });
      return response.data;
    } catch (err) {
      return null;
    }
  },

  async getAuth0Detail() {
    try {
      const idToken = await localStorage.getItem("idToken");

      const { sub: userId } = jwtDecode<JwtPayload>(idToken!!);
      const response = await Axios.get(
        `https://${authConfig.domain}/api/v2/users/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  async generateProfileUploadUrl() {
    try {
      const idToken = await localStorage.getItem("idToken");

      const response = await Axios.post(`${apiEndpoint}/users/photoUrl`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  },
};
