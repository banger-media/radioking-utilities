import Axios from "axios";
import axiosCookieJarSupport from "axios-cookiejar-support";
import * as tough from "tough-cookie";

export function createClient() {
  const axiosInstance = Axios.create({
    timeout: 10000,
    responseType: "json",
    withCredentials: true,
  });
  axiosCookieJarSupport(axiosInstance);
  axiosInstance.defaults.jar = new tough.CookieJar();
  return axiosInstance;
}
