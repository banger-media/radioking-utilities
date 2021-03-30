"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadioManager = void 0;
var FormData = require("form-data");
var Path = require("path");
var url_1 = require("url");
var request_lib_1 = require("./request.lib");
var API_BASE_URL = new url_1.URL("https://api.radioking.io/");
var RadioManager = /** @class */ (function () {
    function RadioManager(_a) {
        var radio = _a.radio, credentials = _a.credentials;
        this.client = request_lib_1.createClient();
        this.radio = radio;
        this.credentials = credentials;
    }
    RadioManager.prototype.getCurrentPlaying = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, exception_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        url = API_BASE_URL;
                        url.pathname = Path.join("/widget/radio/", this.radio.slug, "/track/current");
                        return [4 /*yield*/, this.client.request({
                                url: url.toString(),
                                method: "GET",
                                responseType: "json",
                                headers: {
                                    authorization: this.credentials.token_type + " " + this.credentials.access_token,
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, Promise.resolve(response.data)];
                    case 2:
                        exception_1 = _a.sent();
                        return [2 /*return*/, Promise.reject(exception_1)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RadioManager.prototype.getNext = function (limit) {
        if (limit === void 0) { limit = 1; }
        return __awaiter(this, void 0, void 0, function () {
            var url, response, exception_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        url = API_BASE_URL;
                        url.pathname = Path.join("/widget/radio/", this.radio.slug, "/track/next");
                        return [4 /*yield*/, this.client.request({
                                url: url.toString(),
                                method: "GET",
                                responseType: "json",
                                headers: {
                                    authorization: this.credentials.token_type + " " + this.credentials.access_token,
                                },
                                params: {
                                    limit: limit,
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, Promise.resolve(response.data)];
                    case 2:
                        exception_2 = _a.sent();
                        return [2 /*return*/, Promise.reject(exception_2)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RadioManager.prototype.getStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, exception_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        url = API_BASE_URL;
                        url.pathname = Path.join("/radio", this.radio.idradio.toString(), "/status");
                        return [4 /*yield*/, this.client.request({
                                url: url.toString(),
                                method: "GET",
                                responseType: "json",
                                headers: {
                                    authorization: this.credentials.token_type + " " + this.credentials.access_token,
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, Promise.resolve(response.data)];
                    case 2:
                        exception_3 = _a.sent();
                        return [2 /*return*/, Promise.reject(exception_3)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RadioManager.prototype.getSessionHistory = function (from, unit) {
        if (from === void 0) { from = new Date(); }
        if (unit === void 0) { unit = "minute"; }
        return __awaiter(this, void 0, void 0, function () {
            var url, response, exception_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        url = API_BASE_URL;
                        url.pathname = Path.join("/radio", this.radio.idradio.toString(), "/statistics/session/history");
                        return [4 /*yield*/, this.client.request({
                                url: url.toString(),
                                method: "GET",
                                responseType: "json",
                                params: {
                                    // TODO: Requires an ISO 8601 string with timezone offset
                                    from: from.toISOString(),
                                    by: unit,
                                },
                                headers: {
                                    authorization: this.credentials.token_type + " " + this.credentials.access_token,
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, Promise.resolve(response.data)];
                    case 2:
                        exception_4 = _a.sent();
                        return [2 /*return*/, Promise.reject(exception_4)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RadioManager.prototype.getConsumption = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, exception_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        url = API_BASE_URL;
                        url.pathname = Path.join("/radio", this.radio.idradio.toString(), "/consumption");
                        return [4 /*yield*/, this.client.request({
                                url: url.toString(),
                                method: "GET",
                                responseType: "json",
                                headers: {
                                    authorization: this.credentials.token_type + " " + this.credentials.access_token,
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, Promise.resolve(response.data)];
                    case 2:
                        exception_5 = _a.sent();
                        return [2 /*return*/, Promise.reject(exception_5)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RadioManager.prototype.getPlaylists = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, exception_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        url = API_BASE_URL;
                        url.pathname = Path.join("/radio", this.radio.idradio.toString(), "/playlist");
                        return [4 /*yield*/, this.client.request({
                                url: url.toString(),
                                method: "GET",
                                responseType: "json",
                                headers: {
                                    authorization: this.credentials.token_type + " " + this.credentials.access_token,
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, Promise.resolve(response.data)];
                    case 2:
                        exception_6 = _a.sent();
                        return [2 /*return*/, Promise.reject(exception_6)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RadioManager.prototype.getTrash = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, exception_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        url = API_BASE_URL;
                        url.pathname = Path.join("/radio", this.radio.idradio.toString(), "/trash");
                        return [4 /*yield*/, this.client.request({
                                url: url.toString(),
                                method: "GET",
                                responseType: "json",
                                headers: {
                                    authorization: this.credentials.token_type + " " + this.credentials.access_token,
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, Promise.resolve(response.data)];
                    case 2:
                        exception_7 = _a.sent();
                        return [2 /*return*/, Promise.reject(exception_7)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RadioManager.prototype.getBoxes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, exception_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        url = API_BASE_URL;
                        url.pathname = Path.join("/radio", this.radio.idradio.toString(), "/box");
                        return [4 /*yield*/, this.client.request({
                                url: url.toString(),
                                method: "GET",
                                responseType: "json",
                                headers: {
                                    authorization: this.credentials.token_type + " " + this.credentials.access_token,
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, Promise.resolve(response.data)];
                    case 2:
                        exception_8 = _a.sent();
                        return [2 /*return*/, Promise.reject(exception_8)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RadioManager.prototype.getIndividualBox = function (boxID) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, exception_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        url = API_BASE_URL;
                        url.pathname = Path.join("/radio", this.radio.idradio.toString(), "/track");
                        return [4 /*yield*/, this.client.request({
                                url: url.toString(),
                                method: "GET",
                                responseType: "json",
                                params: {
                                    idbox: boxID,
                                },
                                headers: {
                                    authorization: this.credentials.token_type + " " + this.credentials.access_token,
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, Promise.resolve(response.data)];
                    case 2:
                        exception_9 = _a.sent();
                        return [2 /*return*/, Promise.reject(exception_9)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RadioManager.prototype.getMusicLibrary = function () {
        return __awaiter(this, void 0, void 0, function () {
            var musicBox, musicList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getBoxes()];
                    case 1:
                        musicBox = (_a.sent()).find(function (box) { return box.name === "__MUSIC__"; });
                        return [4 /*yield*/, this.getIndividualBox(musicBox.idtrackbox)];
                    case 2:
                        musicList = _a.sent();
                        return [2 /*return*/, musicList];
                }
            });
        });
    };
    RadioManager.prototype.uploadToBox = function (boxID, track) {
        return __awaiter(this, void 0, void 0, function () {
            var url, trackBody, response, exception_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        url = API_BASE_URL;
                        url.pathname = Path.join("/radio", this.radio.idradio.toString(), "/track");
                        trackBody = new FormData();
                        trackBody.append("file", track);
                        return [4 /*yield*/, this.client.request({
                                url: url.toString(),
                                method: "POST",
                                responseType: "json",
                                params: {
                                    idbox: boxID,
                                },
                                data: trackBody,
                                headers: {
                                    authorization: this.credentials.token_type + " " + this.credentials.access_token,
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, Promise.resolve(response.data)];
                    case 2:
                        exception_10 = _a.sent();
                        return [2 /*return*/, Promise.reject(exception_10)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RadioManager.prototype.getStatusOfUploadProcess = function (trackID, processID) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, exception_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        url = API_BASE_URL;
                        url.pathname = Path.join("/radio", this.radio.idradio.toString(), "/track", trackID.toString(), "/process", processID);
                        return [4 /*yield*/, this.client.request({
                                url: url.toString(),
                                method: "GET",
                                responseType: "json",
                                headers: {
                                    authorization: this.credentials.token_type + " " + this.credentials.access_token,
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, Promise.resolve(response.data)];
                    case 2:
                        exception_11 = _a.sent();
                        return [2 /*return*/, Promise.reject(exception_11)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return RadioManager;
}());
exports.RadioManager = RadioManager;
//# sourceMappingURL=radiomanager.lib.js.map