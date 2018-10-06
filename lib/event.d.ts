export declare class ReactKEvent {
    uid?: string;
    day: string;
    created_date: string;
    payload: {};
    client_id: string;
    type: string;
    constructor(clientId: string, eventType: string);
    setUID(value: string): ReactKEvent;
    setUserId(id: string): ReactKEvent;
    setPayload(payload: {}): ReactKEvent;
    setUrl(id: string): ReactKEvent;
    setReferer(): ReactKEvent;
    setUserAgent(): ReactKEvent;
    setLanguage(): ReactKEvent;
    setPlatform(): ReactKEvent;
    setProduct(): ReactKEvent;
    setScreenSize(): ReactKEvent;
}
