import type { LoginData, UserGet } from "@dbm";
import { getBackendURL } from "./url";
import { headers } from "./base";


const loginRoute = getBackendURL("/login");


const lsUserKey = "currentUser";

function setLsCurrentUser(user: UserGet) {
    sessionStorage.setItem(lsUserKey, JSON.stringify(user));
}

function deleteLsCurrentUser() {
    sessionStorage.removeItem(lsUserKey);
}

export function getCurrentUser() {
    const result = sessionStorage.getItem(lsUserKey);
    if (result === null) return null;
    return JSON.parse(result) as UserGet;
}



export async function makeLoginRequest(loginData: LoginData) {
    const result = await fetch(loginRoute, {
        headers: headers,
        credentials: "include",
        method: "POST",
        body: JSON.stringify(loginData)
    });

    if (result.status === 429) {
        const retryAfter = result.headers.get("Retry-After");

        return {
            retryAfter: retryAfter !== null ? parseInt(retryAfter) : null
        };
    }

    if (!result.ok) return false;


    const resultBody: { moreInfo: { user: UserGet }} = await result.json();
    setLsCurrentUser(resultBody.moreInfo.user);

    return true;
}

export async function makeLogoutRequest() {
    const result = await fetch(loginRoute, {
        headers: headers,
        credentials: "include",
        method: "DELETE"
    });

    if (!result.ok) return false;

    deleteLsCurrentUser();

    return true;
}