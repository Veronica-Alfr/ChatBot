export interface IMessage {
    id: string;
    type: string;
    content: string;
    from: string;
    to: string;
    metadata?: object;
}