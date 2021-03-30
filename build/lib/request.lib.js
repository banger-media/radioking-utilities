"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClient = void 0;
var axios_1 = require("axios");
var axios_cookiejar_support_1 = require("axios-cookiejar-support");
var tough = require("tough-cookie");
function createClient() {
    var axiosInstance = axios_1.default.create({
        timeout: 10000,
        responseType: "json",
        withCredentials: true,
    });
    axios_cookiejar_support_1.default(axiosInstance);
    axiosInstance.defaults.jar = new tough.CookieJar();
    return axiosInstance;
}
exports.createClient = createClient;
//# sourceMappingURL=request.lib.js.map