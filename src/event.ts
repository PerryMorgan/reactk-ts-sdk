import moment = require('moment');

const
    prefixKey = "x_reactk_",
    userIdKey = prefixKey + "user_id",
    urlKey = prefixKey + "url",
    userAgentKey = prefixKey + "user_agent",
    refererKey = prefixKey + "referer";

export class ReactKEvent {
    uid?: string;
    day: string;
    created_date: string;
    payload: {};
    client_id: string;
    type: string;

    constructor(clientId: string, eventType: string) {
        this.payload = {};
        this.client_id = clientId;
        this.type = eventType;
        let t = moment();
        t.utcOffset(0); // TODO improve to change timezone
        this.created_date = t.format("YYYY-MM-DD[T]HH:mm:ss[Z]");
        this.day = t.format("YYYY-MM-DD");
        this.setReferer().setUserAgent();
    }

    setUID(value: string): ReactKEvent {
        this.uid = value;
        return this;
    }

    setUserId(id: string): ReactKEvent {
        this.payload[userIdKey] = id;
        return this;
    }

    setPayload(payload: {}): ReactKEvent {
        for (let key in payload) {
            if (key.substr(0, prefixKey.length) != prefixKey) {
                this.payload[key] = payload[key];
            }
        }
        return this;
    }

    setUrl(id: string): ReactKEvent {
        this.payload[urlKey] = id;
        return this;
    }

    setReferer(): ReactKEvent {
        if (document && document.referrer) {
            this.payload[refererKey] = document.referrer;
        }
        return this;
    }

    setUserAgent(): ReactKEvent {
        if (navigator && navigator.userAgent) {
            this.payload[userAgentKey] = navigator.userAgent;
        }
        return this;
    }
}