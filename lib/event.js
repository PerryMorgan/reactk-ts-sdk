"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const prefixKey = "x_reactk_", userIdKey = prefixKey + "user_id", urlKey = prefixKey + "url", userAgentKey = prefixKey + "user_agent", languageKey = prefixKey + "language", platformKey = prefixKey + "platform", screenWidthKey = prefixKey + "screen_width", screenHeightKey = prefixKey + "screen_height", navigatorProductKey = prefixKey + "navigator_product", refererKey = prefixKey + "referer";
class ReactKEvent {
    constructor(clientId, eventType) {
        this.payload = {};
        this.client_id = clientId;
        this.type = eventType;
        let t = moment();
        t.utcOffset(0); // TODO improve to change timezone
        this.created_date = t.format("YYYY-MM-DD[T]HH:mm:ss[Z]");
        this.day = t.format("YYYY-MM-DD");
        this.setReferer().setUserAgent().setLanguage().setProduct().setPlatform().setScreenSize();
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
        for (let key in payload) {
            if (key.substr(0, prefixKey.length) != prefixKey) {
                this.payload[key] = payload[key];
            }
        }
        return this;
    }
    setUrl(id) {
        this.payload[urlKey] = id;
        return this;
    }
    setReferer() {
        if (document && document.referrer) {
            this.payload[refererKey] = document.referrer;
        }
        return this;
    }
    setUserAgent() {
        if (navigator && navigator.userAgent) {
            this.payload[userAgentKey] = navigator.userAgent;
        }
        return this;
    }
    setLanguage() {
        if (navigator && navigator.language) {
            this.payload[languageKey] = navigator.language;
        }
        return this;
    }
    setPlatform() {
        if (navigator && navigator.platform) {
            this.payload[platformKey] = navigator.platform;
        }
        return this;
    }
    setProduct() {
        if (navigator && navigator.product) {
            this.payload[navigatorProductKey] = navigator.product;
        }
        return this;
    }
    setScreenSize() {
        if (screen && screen.width) {
            this.payload[screenWidthKey] = screen.width;
        }
        if (screen && screen.height) {
            this.payload[screenHeightKey] = screen.height;
        }
        return this;
    }
}
exports.ReactKEvent = ReactKEvent;
