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
exports.RadioKing = void 0;
var Path = require("path");
var url_1 = require("url");
var radiomanager_lib_1 = require("./radiomanager.lib");
var request_lib_1 = require("./request.lib");
var PATH_BASE_URL = new url_1.URL("https://www.radioking.com/");
var API_BASE_URL = new url_1.URL("https://api.radioking.io/");
var RadioKing = /** @class */ (function () {
    function RadioKing() {
        this.client = request_lib_1.createClient();
    }
    RadioKing.prototype.login = function (emailAddress, password) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, _a, _b, exception_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 4, , 5]);
                        url = API_BASE_URL;
                        url.pathname = Path.join("/oauth/login");
                        return [4 /*yield*/, this.client.request({
                                url: url.toString(),
                                method: "POST",
                                responseType: "json",
                                data: {
                                    login: emailAddress,
                                    password: password,
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        this.credentials = response.data;
                        _a = this;
                        return [4 /*yield*/, this.getAuthenticatedUser()];
                    case 2:
                        _a.authenticatedUser = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this.getManagedRadioStationsAdvanced()];
                    case 3:
                        _b.radios = _c.sent();
                        return [2 /*return*/, Promise.resolve(this.credentials)];
                    case 4:
                        exception_1 = _c.sent();
                        return [2 /*return*/, Promise.reject(exception_1)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    RadioKing.prototype.getAuthenticatedUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, exception_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        url = PATH_BASE_URL;
                        url.pathname = Path.join("/api/user/me");
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
                        this.authenticatedUser = response.data.data;
                        return [2 /*return*/, Promise.resolve(this.authenticatedUser)];
                    case 2:
                        exception_2 = _a.sent();
                        return [2 /*return*/, Promise.reject(exception_2)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RadioKing.prototype.getManagedRadioStationsAdvanced = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, exception_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        url = PATH_BASE_URL;
                        url.pathname = Path.join("/api/user/me/radio");
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
                        this.radios = response.data.data;
                        return [2 /*return*/, Promise.resolve(this.radios)];
                    case 2:
                        exception_3 = _a.sent();
                        return [2 /*return*/, Promise.reject(exception_3)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RadioKing.prototype.getManagedRadioStationsBasic = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, exception_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        url = API_BASE_URL;
                        url.pathname = Path.join("/user", this.authenticatedUser.iduser.toString(), "/radio");
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
                        this.radios = response.data;
                        return [2 /*return*/, Promise.resolve(this.radios)];
                    case 2:
                        exception_4 = _a.sent();
                        return [2 /*return*/, Promise.reject(exception_4)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RadioKing.prototype.setActiveRadio = function (radio) {
        this.currentRadio = new radiomanager_lib_1.RadioManager({
            radio: radio,
            credentials: this.credentials,
        });
    };
    return RadioKing;
}());
exports.RadioKing = RadioKing;
//# sourceMappingURL=radioking.lib.js.map