import { AxiosResponse } from "axios";
export declare class ReactK {
    private clientId;
    private userId;
    private httpClient;
    constructor(clientId: string, userId?: string);
    setUserId(userId: string): void;
    track(eventType: string, payload?: Map<string, any>): Promise<AxiosResponse>;
    private getDeviceId;
}
