import * as FormData from "form-data";
import * as Path from "path";
import { URL } from "url";
import { createClient } from "./request.lib";

const API_BASE_URL = new URL("https://api.radioking.io/");

type RadioKingCredentials = {
  access_token: string;
  expires_in: number;
  iduser: number;
  refresh_token: string;
  token_type: string;
};

export class RadioManager {
  private client;
  private radio;
  private credentials: RadioKingCredentials;

  constructor({ radio, credentials }) {
    this.client = createClient();
    this.radio = radio;
    this.credentials = credentials;
  }

  async getCurrentPlaying() {
    try {
      const url = API_BASE_URL;
      url.pathname = Path.join(
        "/widget/radio/",
        this.radio.slug,
        "/track/current"
      );

      const response = await this.client.request({
        url: url.toString(),
        method: "GET",
        responseType: "json",
        headers: {
          authorization: `${this.credentials.token_type} ${this.credentials.access_token}`,
        },
      });
      return Promise.resolve(response.data);
    } catch (exception) {
      return Promise.reject(exception);
    }
  }
  async getNext(limit: number = 1) {
    try {
      const url = API_BASE_URL;
      url.pathname = Path.join(
        "/widget/radio/",
        this.radio.slug,
        "/track/next"
      );
      const response = await this.client.request({
        url: url.toString(),
        method: "GET",
        responseType: "json",
        headers: {
          authorization: `${this.credentials.token_type} ${this.credentials.access_token}`,
        },
        params: {
          limit,
        },
      });
      return Promise.resolve(response.data);
    } catch (exception) {
      return Promise.reject(exception);
    }
  }

  async getStatus() {
    try {
      const url = API_BASE_URL;
      url.pathname = Path.join(
        "/radio",
        this.radio.idradio.toString(),
        "/status"
      );

      const response = await this.client.request({
        url: url.toString(),
        method: "GET",
        responseType: "json",
        headers: {
          authorization: `${this.credentials.token_type} ${this.credentials.access_token}`,
        },
      });
      return Promise.resolve(response.data);
    } catch (exception) {
      return Promise.reject(exception);
    }
  }

  async getSessionHistory(
    from: Date = new Date(),
    unit: "minute" | "second" | "hour" = "minute"
  ) {
    try {
      const url = API_BASE_URL;
      url.pathname = Path.join(
        "/radio",
        this.radio.idradio.toString(),
        "/statistics/session/history"
      );

      const response = await this.client.request({
        url: url.toString(),
        method: "GET",
        responseType: "json",
        params: {
          // TODO: Requires an ISO 8601 string with timezone offset
          from: from.toISOString(),
          by: unit,
        },
        headers: {
          authorization: `${this.credentials.token_type} ${this.credentials.access_token}`,
        },
      });
      return Promise.resolve(response.data);
    } catch (exception) {
      return Promise.reject(exception);
    }
  }

  async getConsumption() {
    try {
      const url = API_BASE_URL;
      url.pathname = Path.join(
        "/radio",
        this.radio.idradio.toString(),
        "/consumption"
      );
      const response = await this.client.request({
        url: url.toString(),
        method: "GET",
        responseType: "json",
        headers: {
          authorization: `${this.credentials.token_type} ${this.credentials.access_token}`,
        },
      });
      return Promise.resolve(response.data);
    } catch (exception) {
      return Promise.reject(exception);
    }
  }

  async getPlaylists() {
    try {
      const url = API_BASE_URL;
      url.pathname = Path.join(
        "/radio",
        this.radio.idradio.toString(),
        "/playlist"
      );

      const response = await this.client.request({
        url: url.toString(),
        method: "GET",
        responseType: "json",
        headers: {
          authorization: `${this.credentials.token_type} ${this.credentials.access_token}`,
        },
      });
      return Promise.resolve(response.data);
    } catch (exception) {
      return Promise.reject(exception);
    }
  }

  async getTrash() {
    try {
      const url = API_BASE_URL;
      url.pathname = Path.join(
        "/radio",
        this.radio.idradio.toString(),
        "/trash"
      );

      const response = await this.client.request({
        url: url.toString(),
        method: "GET",
        responseType: "json",
        headers: {
          authorization: `${this.credentials.token_type} ${this.credentials.access_token}`,
        },
      });
      return Promise.resolve(response.data);
    } catch (exception) {
      return Promise.reject(exception);
    }
  }

  async getBoxes() {
    try {
      const url = API_BASE_URL;
      url.pathname = Path.join("/radio", this.radio.idradio.toString(), "/box");

      const response = await this.client.request({
        url: url.toString(),
        method: "GET",
        responseType: "json",
        headers: {
          authorization: `${this.credentials.token_type} ${this.credentials.access_token}`,
        },
      });
      return Promise.resolve(response.data);
    } catch (exception) {
      return Promise.reject(exception);
    }
  }

  async getIndividualBox(boxID: number) {
    try {
      const url = API_BASE_URL;
      url.pathname = Path.join(
        "/radio",
        this.radio.idradio.toString(),
        "/track"
      );

      const response = await this.client.request({
        url: url.toString(),
        method: "GET",
        responseType: "json",
        params: {
          idbox: boxID,
        },
        headers: {
          authorization: `${this.credentials.token_type} ${this.credentials.access_token}`,
        },
      });
      return Promise.resolve(response.data);
    } catch (exception) {
      return Promise.reject(exception);
    }
  }

  async getMusicLibrary() {
    const musicBox = (await this.getBoxes()).find(
      (box) => box.name === "__MUSIC__"
    );
    const musicList = await this.getIndividualBox(musicBox.idtrackbox);
    return musicList;
  }

  async uploadToBox(boxID: number, track: Buffer) {
    try {
      const url = API_BASE_URL;
      url.pathname = Path.join(
        "/radio",
        this.radio.idradio.toString(),
        "/track"
      );
      // Prepare the mulipart/form-data buffer
      let trackBody = new FormData();
      trackBody.append("file", track);

      const response = await this.client.request({
        url: url.toString(),
        method: "POST",
        responseType: "json",
        params: {
          idbox: boxID,
        },
        data: trackBody,
        headers: {
          authorization: `${this.credentials.token_type} ${this.credentials.access_token}`,
        },
      });
      return Promise.resolve(response.data);
    } catch (exception) {
      return Promise.reject(exception);
    }
  }

  async getStatusOfUploadProcess(trackID: number, processID: string) {
    try {
      const url = API_BASE_URL;
      url.pathname = Path.join(
        "/radio",
        this.radio.idradio.toString(),
        "/track",
        trackID.toString(),
        "/process",
        processID
      );

      const response = await this.client.request({
        url: url.toString(),
        method: "GET",
        responseType: "json",
        headers: {
          authorization: `${this.credentials.token_type} ${this.credentials.access_token}`,
        },
      });
      return Promise.resolve(response.data);
    } catch (exception) {
      return Promise.reject(exception);
    }
  }
}
