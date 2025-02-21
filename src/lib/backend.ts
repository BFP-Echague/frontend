import { env } from "./env";

// Gets the backend URL. Always add leading slash (/route).
export function getBackendURL(route: string) {
    return env.BACKEND_API_URL + route;
}