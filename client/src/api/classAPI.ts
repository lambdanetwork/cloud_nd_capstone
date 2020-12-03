import Axios from "axios";
import { apiEndpoint } from "../config/authConfig";

export default {
  async getClasses() : Promise<any[]> {
    try {
      const idToken = await localStorage.getItem("idToken");
      const response = await Axios.get(`${apiEndpoint}/classes`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      });
      return response.data;
    } catch (err) {
      console.error(err)
      return [];
    }
  },

  async createClass(body: any) {
    try {
      const idToken = await localStorage.getItem("idToken");
      const response = await Axios.post(`${apiEndpoint}/classes`, body, {
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


  /**
   * Class can be closed with a valid reason by either student or tutor
   */
  async closeClass(body: any) {
    try {
      const idToken = await localStorage.getItem("idToken");
      const response = await Axios.post(`${apiEndpoint}/classes/close`, body, {
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

  /**
   * Complete class when user consider that class is finished
   */
  async completeClass(body: any) {
    try {
      const idToken = await localStorage.getItem("idToken");
      const response = await Axios.post(`${apiEndpoint}/classes/complete`, body, {
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

  async uploadImage(uploadUrl: string, image: string){
    try {
      const buffer = Buffer.from(image, 'base64')
      await Axios.put(uploadUrl, buffer, {headers: {'Content-Type': 'image/png'}});
      return true;
    } catch (err) {
      console.error(err);
    }
  },

  async generateProfileUploadUrl(classId:string) {
    try {
      const idToken = await localStorage.getItem("idToken");
      const response = await Axios.post(`${apiEndpoint}/classes/photoUrl`, {
        classId
      }, {
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      }});
      return response.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  },
};
