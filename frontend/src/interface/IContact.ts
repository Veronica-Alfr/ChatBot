export interface IContact {
    name: string;
    identity: string;
    group?: string;
    lastMessageDate?: string;
    lastUpdateDate?: string;
    email?: string;
    extras?: object;
}