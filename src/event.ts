import moment = require('moment');

const
    prefixKey = "x_reactk_",
    userIdKey = prefixKey + "user_id",
    urlKey = prefixKey + "url";

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
    }

    setUID(value: string): ReactKEvent {
        this.uid = value;
        return this;
    }

    setUserId(id: string): ReactKEvent {
        this.payload[userIdKey] = id;
        return this;
    }

    setPayload(payload: Map<string, any>): ReactKEvent {
        payload.forEach((value, key) => {
            // avoid override internal property
            if (key.substr(0, prefixKey.length) != prefixKey) {
                this.payload[key] = value;
            }
        });
        return this;
    }

    setUrl(id: string): ReactKEvent {
        this.payload[urlKey] = id;
        return this;
    }
}