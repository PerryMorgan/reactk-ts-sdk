import { AxiosInstance, AxiosResponse } from 'axios';
import { ReactKEvent } from "./event";
export declare class ReactKHttpClient {
    apiEndpointUrl: string;
    apiTransmitPath: string;
    httpClient: AxiosInstance;
    constructor();
    pushEvent(event: ReactKEvent): Promise<AxiosResponse>;
}
