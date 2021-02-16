import * as Path from "path";
import { URL } from "url";
import { RadioManager } from "./radiomanager.lib";
import { createClient } from "./request.lib";

const PATH_BASE_URL = new URL("https://www.radioking.com/");
const API_BASE_URL = new URL("https://api.radioking.io/");

type RadioKingCredentials = {
  access_token: string;
  expires_in: number;
  iduser: number;
  refresh_token: string;
  token_type: string;
};

export class RadioKing {
  private client;
  private credentials: RadioKingCredentials;
  public currentRadio: RadioManager;
  public authenticatedUser;
  public radios;

  constructor() {
    this.client = createClient();
  }

  async login(emailAddress: string, password: string) {
    try {
      const url = API_BASE_URL;
      url.pathname = Path.join("/oauth/login");

      const response = await this.client.request({
        url: url.toString(),
        method: "POST",
        responseType: "json",
        data: {
          login: emailAddress,
          password: password,
        },
      });
      this.credentials = response.data;

      this.authenticatedUser = await this.getAuthenticatedUser();
      this.radios = await this.getManagedRadioStationsAdvanced();

      return Promise.resolve(this.credentials);
    } catch (exception) {
      return Promise.reject(exception);
    }
  }

  async getAuthenticatedUser() {
    try {
      const url = PATH_BASE_URL;
      url.pathname = Path.join("/api/user/me");

      const response = await this.client.request({
        url: url.toString(),
        method: "GET",
        responseType: "json",
        headers: {
          authorization: `${this.credentials.token_type} ${this.credentials.access_token}`,
        },
      });
      this.authenticatedUser = response.data.data;
      return Promise.resolve(this.authenticatedUser);
    } catch (exception) {
      return Promise.reject(exception);
    }
  }

  async getManagedRadioStationsAdvanced() {
    try {
      const url = PATH_BASE_URL;
      url.pathname = Path.join("/api/user/me/radio");

      const response = await this.client.request({
        url: url.toString(),
        method: "GET",
        responseType: "json",
        headers: {
          authorization: `${this.credentials.token_type} ${this.credentials.access_token}`,
        },
      });
      this.radios = response.data.data;
      return Promise.resolve(this.radios);
    } catch (exception) {
      return Promise.reject(exception);
    }
  }

  async getManagedRadioStationsBasic() {
    try {
      const url = API_BASE_URL;
      url.pathname = Path.join(
        "/user",
        this.authenticatedUser.iduser.toString(),
        "/radio"
      );

      const response = await this.client.request({
        url: url.toString(),
        method: "GET",
        responseType: "json",
        headers: {
          authorization: `${this.credentials.token_type} ${this.credentials.access_token}`,
        },
      });
      this.radios = response.data;
      return Promise.resolve(this.radios);
    } catch (exception) {
      return Promise.reject(exception);
    }
  }

  setActiveRadio(radio) {
    this.currentRadio = new RadioManager({
      radio: radio,
      credentials: this.credentials,
    });
  }
}
