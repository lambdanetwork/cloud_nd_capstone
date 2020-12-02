import Axios from "axios";
import { apiEndpoint } from "../config/authConfig";

export default {
  async getAll() {
    try {
      const idToken = await localStorage.getItem("idToken");

      const response = await Axios.get(`${apiEndpoint}/tutors`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      });
      return response.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  async getById() {
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
      console.error(err);
      return null;
    }
  },
};
