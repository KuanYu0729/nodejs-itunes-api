/// <reference types="node" />
export interface iTunesOptions {
    privateKey: Buffer | string;
    /**
     * API_KEY
     */
    apiKey: string;
    /**
     * Expires time
     */
    expriresIn?: number;
    /**
     * Issuer ID
     */
    issuerId: string;
}
