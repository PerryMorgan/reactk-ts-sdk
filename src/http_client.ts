import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {ReactKEvent} from "./event";

export class ReactKHttpClient {
    apiEndpointUrl: string = "https://data-api.reactk.com/api/v1";
    apiTransmitPath: string = "/tx";
    httpClient: AxiosInstance;

    constructor() {
        this.httpClient = axios.create(<AxiosRequestConfig>{
            baseURL: this.apiEndpointUrl,
            maxRedirects: 1,
        });
    }

    async pushEvent(event: ReactKEvent): Promise<AxiosResponse> {
        for (let i = 0; i < 5; i++) {
            try {
                let resp = await this.httpClient.post(
                    this.apiTransmitPath,
                    event
                ) as AxiosResponse<void>;
                if (resp.status == 204) {
                    return resp
                }
            } catch (err) {
                console.info("catch push event error", err);
            }
            await sleep(100);
        }
        console.info("fail to push event", event);
    }
}

async function sleep(duration: number): Promise<{}> {
    return new Promise(((resolve) => {
        setTimeout(resolve, duration);
    }));
}