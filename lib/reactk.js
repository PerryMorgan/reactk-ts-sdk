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
        this.track("reactk_client_init");
    }
    setUserId(userId) {
        this.userId = userId;
        this.track("reactk_update_user_id");
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
