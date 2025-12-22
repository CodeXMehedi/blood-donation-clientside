import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: 'https://blood-donation-server-weld.vercel.app/'
})