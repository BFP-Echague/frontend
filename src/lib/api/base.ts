import type { PagedResult } from "@dbm";
import { getBackendURL } from "./url";
import Decimal from "decimal.js";



export const headers = {
    'Content-Type': 'application/json'
};



// we don't talk about it.
const dateRegex = /^([\\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\\:?00)([\\.,]\d+(?!:))?)?(\17[0-5]\d([\\.,]\d+)?)?([zZ]|([\\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;

function parseEach<T>(obj: T) {
    if (typeof obj === 'string') {
        if (!isNaN(Date.parse(obj)) && obj.match(dateRegex)) {
            return new Date(obj) as T;
        }

        try {
            return new Decimal(obj) as T;
        } catch {
            return obj as T;
        } 
    }

    return obj as T;
}

function parseGet<T>(obj: T): T {
    if (Array.isArray(obj)) {
        return obj.map(item => parseGet(item)) as unknown as T;
    }

    if (obj && typeof obj === 'object' && obj !== null) {
        const newObj = {} as { [K in keyof T]: T[K] };
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                newObj[key] = parseGet(obj[key]);
            }
        }
        return newObj;
    }

    return parseEach(obj);
}


export interface JSONResponse<GetPayload extends object> {
    message: string;
    moreInfo: GetPayload
}


export class FullResponse<GetPayload extends object> {
    public constructor(
        public response: Response,
    ) { }

    public async getJson() {
        return await this.response.json() as JSONResponse<GetPayload>;
    }

    public async getMoreInfoParsed() {
        return parseGet((await this.getJson()).moreInfo);
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