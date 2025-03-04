import { getBackendURL } from "./url";



export const headers = {
    'Content-Type': 'application/json'
};


export interface JSONResponse<GetPayload extends object> {
    message: string;
    moreInfo: GetPayload
}


export class FullResponse<GetPayload extends object> {
    public constructor(
        public response: Response,
    ) {}

    public async getJson() {
        return await this.response.json() as JSONResponse<GetPayload>;
    }

    public async getMoreInfo() {
        return (await this.getJson()).moreInfo;
    }

    public async isOK() { return this.response.ok; }
}


export abstract class APIRoute<Upsert extends object, GetPayload extends object> {
    public abstract path: string;

    public getFullURL() {
        return new URL(getBackendURL(this.path));
    }

    public getFullURLWithId(id: number) {
        const url = this.getFullURL();
        url.pathname += "/" + id.toString();

        return url;
    }


    public async get(id: number) {
        const result = await fetch(this.getFullURLWithId(id), {
            method: "GET",
            credentials: "include"
        });

        return new FullResponse<GetPayload>(result);
    }

    public async getMany() {
        const result = await fetch(this.getFullURL(), {
            method: "GET",
            credentials: "include"
        });

        return new FullResponse<GetPayload[]>(result);
    }


    public async post(body: Upsert) {
        const result = await fetch(this.getFullURL(), {
            method: "POST",
            headers: headers,
            credentials: "include",
            body: JSON.stringify(body)
        });

        return new FullResponse<GetPayload>(result);
    }


    public async patch(id: number, body: Upsert) {
        const result = await fetch(this.getFullURLWithId(id), {
            method: "PATCH",
            headers: headers,
            credentials: "include",
            body: JSON.stringify(body)
        });

        return new FullResponse<GetPayload>(result);
    }

    public async delete(id: number) {
        const result = await fetch(this.getFullURLWithId(id), {
            method: "DELETE",
            credentials: "include"
        });

        return new FullResponse<GetPayload>(result);
    }
}