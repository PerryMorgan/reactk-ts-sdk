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
    setPayload(payload: Map<string, any>): ReactKEvent;
    setUrl(id: string): ReactKEvent;
}
