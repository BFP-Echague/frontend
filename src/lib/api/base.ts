import { getBackendURL } from "./url";



export const headers = {
    'Content-Type': 'application/json'
};


export abstract class APIRoute<Upsert extends object> {
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
        return await fetch(this.getFullURLWithId(id), {
            method: "GET",
            credentials: "include"
        });
    }


    public async post(body: Upsert) {
        return await fetch(this.getFullURL(), {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(body)
        });
    }
}