import { AxiosResponse } from "axios";
export declare class ReactK {
    private clientId;
    private userId;
    private httpClient;
    constructor(clientId: string, userId?: string);
    setUserId(userId: string): void;
    track(eventType: string, payload?: {}): Promise<AxiosResponse>;
    private getDeviceId;
}
export declare function init(clientId: string, userId?: string): void;
export declare function setUserId(userId: string): void;
export declare function track(eventType: string, payload?: {}): Promise<AxiosResponse>;
