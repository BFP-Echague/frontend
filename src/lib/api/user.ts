import { type UserGet, type UserUpsert } from "@dbm";
import { APIRoute } from "./base";


export class UserAPIRoute extends APIRoute<UserUpsert, UserGet> {
    public static instance = new UserAPIRoute();
    public override path = "/user";
}