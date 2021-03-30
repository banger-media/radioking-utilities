/// <reference types="node" />
export declare class RadioManager {
    private client;
    private radio;
    private credentials;
    constructor({ radio, credentials }: {
        radio: any;
        credentials: any;
    });
    getCurrentPlaying(): Promise<any>;
    getNext(limit?: number): Promise<any>;
    getStatus(): Promise<any>;
    getSessionHistory(from?: Date, unit?: "minute" | "second" | "hour"): Promise<any>;
    getConsumption(): Promise<any>;
    getPlaylists(): Promise<any>;
    getTrash(): Promise<any>;
    getBoxes(): Promise<any>;
    getIndividualBox(boxID: number): Promise<any>;
    getMusicLibrary(): Promise<any>;
    uploadToBox(boxID: number, track: Buffer): Promise<any>;
    getStatusOfUploadProcess(trackID: number, processID: string): Promise<any>;
}
