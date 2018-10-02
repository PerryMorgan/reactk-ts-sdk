"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const prefixKey = "x_reactk_", userIdKey = prefixKey + "user_id", urlKey = prefixKey + "url";
class ReactKEvent {
    constructor(clientId, eventType) {
        this.payload = {};
        this.client_id = clientId;
        this.type = eventType;
        let t = moment();
        t.utcOffset(0); // TODO improve to change timezone
        this.created_date = t.format("YYYY-MM-DD[T]HH:mm:ss[Z]");
        this.day = t.format("YYYY-MM-DD");
    }
    setUID(value) {
        this.uid = value;
        return this;
    }
    setUserId(id) {
        this.payload[userIdKey] = id;
        return this;
    }
    setPayload(payload) {
        payload.forEach((value, key) => {
            // avoid override internal property
            if (key.substr(0, prefixKey.length) != prefixKey) {
                this.payload[key] = value;
            }
        });
        return this;
    }
    setUrl(id) {
        this.payload[urlKey] = id;
        return this;
    }
}
exports.ReactKEvent = ReactKEvent;

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

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_client_1 = require("./http_client");
const event_1 = require("./event");
const uuidv4 = require('uuid/v4');
const deviceIdLocalStorageKey = "reactk_did";
class ReactK {
    constructor(clientId, userId) {
        this.clientId = clientId;
        this.userId = userId;
        this.httpClient = new http_client_1.ReactKHttpClient();
        this.track("client_init");
    }
    setUserId(userId) {
        this.userId = userId;
        this.track("update_user_id");
    }
    track(eventType, payload) {
        let event = new event_1.ReactKEvent(this.clientId, eventType)
            .setUID(this.getDeviceId());
        if (this.userId) {
            event.setUserId(this.userId);
        }
        if (payload) {
            event.setPayload(payload);
        }
        if (window.location && window.location.href) {
            event.setUrl(window.location.href);
        }
        return this.httpClient.pushEvent(event);
    }
    getDeviceId() {
        if (localStorage.getItem(deviceIdLocalStorageKey)) {
            return localStorage.getItem(deviceIdLocalStorageKey);
        }
        let id = uuidv4();
        localStorage.setItem(deviceIdLocalStorageKey, id);
        return id;
    }
}
exports.ReactK = ReactK;
