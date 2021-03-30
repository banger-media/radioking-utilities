import { RadioManager } from "./radiomanager.lib";
declare type RadioKingCredentials = {
    access_token: string;
    expires_in: number;
    iduser: number;
    refresh_token: string;
    token_type: string;
};
export declare class RadioKing {
    private client;
    private credentials;
    currentRadio: RadioManager;
    authenticatedUser: any;
    radios: any;
    constructor();
    login(emailAddress: string, password: string): Promise<RadioKingCredentials>;
    getAuthenticatedUser(): Promise<any>;
    getManagedRadioStationsAdvanced(): Promise<any>;
    getManagedRadioStationsBasic(): Promise<any>;
    setActiveRadio(radio: any): void;
}
export {};
