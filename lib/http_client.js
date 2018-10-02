"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class ReactKHttpClient {
    constructor() {
        this.apiEndpointUrl = "https://data-api.reactk.com/api/v1";
        this.apiTransmitPath = "/tx";
        this.httpClient = axios_1.default.create({
            baseURL: this.apiEndpointUrl,
            maxRedirects: 1,
        });
    }
    pushEvent(event) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < 5; i++) {
                try {
                    let resp = yield this.httpClient.post(this.apiTransmitPath, event);
                    if (resp.status == 204) {
                        return resp;
                    }
                }
                catch (err) {
                    console.info("catch push event error", err);
                }
                yield sleep(100);
            }
            console.info("fail to push event", event);
        });
    }
}
exports.ReactKHttpClient = ReactKHttpClient;
function sleep(duration) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(((resolve) => {
            setTimeout(resolve, duration);
        }));
    });
}
