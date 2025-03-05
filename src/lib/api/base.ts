import type { PagedResult } from "@dbm/interfaces";
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


export abstract class APIRoute<Upsert extends object, GetPayload extends object, IsPaged extends boolean = false> {
    public abstract path: string;

    public getFullURL(urlSearchParams: URLSearchParams | undefined = undefined) {
        let urlRaw = getBackendURL(this.path);
        if (urlSearchParams !== undefined) {
            urlRaw += "?" + urlSearchParams.toString();
        }
        return new URL(urlRaw);
    }

    public getFullURLWithId(id: number, urlSearchParams: URLSearchParams | undefined = undefined) {
        const url = this.getFullURL(urlSearchParams);
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

    public async getMany(urlSearchParams: URLSearchParams | undefined = undefined) {
        const url = this.getFullURL(urlSearchParams);
        const result = await fetch(url, {
            method: "GET",
            credentials: "include"
        });

        return new FullResponse<IsPaged extends true ? PagedResult<GetPayload[]> : GetPayload[]>(result);
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