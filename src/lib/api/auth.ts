import type { LoginData } from "@dbm/auth";
import { getBackendURL } from "./url";
import { headers } from "./base";
import type { UserGet } from "./user";


const loginRoute = getBackendURL("/login");


const lsUserKey = "currentUser";

function setLsCurrentUser(user: UserGet) {
    localStorage.setItem(lsUserKey, JSON.stringify(user));
}

function deleteLsCurrentUser() {
    localStorage.removeItem(lsUserKey);
}

export function getCurrentUser() {
    const result = localStorage.getItem(lsUserKey);
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

    if (result.status === 429) return null;

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