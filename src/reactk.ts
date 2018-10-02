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
        this.track("client_init");
    }

    setUserId(userId: string) {
        this.userId = userId;
        this.track("update_user_id");
    }

    track(eventType: string, payload?: Map<string, any>): Promise<AxiosResponse> {
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