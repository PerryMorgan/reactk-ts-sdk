import {ReactKHttpClient} from "./http_client";
import {ReactKEvent} from "./event";
import {AxiosResponse} from "axios";

const uuidv4 = require('uuid/v4');

const deviceIdLocalStorageKey: string = "reactk_did";

export class ReactK {

    private clientId: string;
    private userId: string;
    private httpClient: ReactKHttpClient;

    constructor(clientId: string, userId?: string) {
        this.clientId = clientId;
        this.userId = userId;
        this.httpClient = new ReactKHttpClient();
        this.track("reactk_client_init");
    }

    setUserId(userId: string) {
        this.userId = userId;
        this.track("reactk_update_user_id");
    }

    track(eventType: string, payload?: {}): Promise<AxiosResponse> {
        let event = new ReactKEvent(this.clientId, eventType)
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

    private getDeviceId(): string {
        if (localStorage.getItem(deviceIdLocalStorageKey)) {
            return localStorage.getItem(deviceIdLocalStorageKey)
        }
        let id = uuidv4();
        localStorage.setItem(deviceIdLocalStorageKey, id);
        return id;
    }

}

let rc: ReactK;

export function init(clientId: string, userId?: string) {
    rc = new ReactK(clientId, userId);
}

export function setUserId(userId: string) {
    if (rc === undefined) {
        console.log("react.Init() must be called before using setUserId()");
        return
    }
    rc.setUserId(userId);
}

export function track(eventType: string, payload?: {}): Promise<AxiosResponse> {
    if (rc === undefined) {
        console.log("react.Init() must be called before using track()");
        return
    }
    return rc.track(eventType, payload);
}