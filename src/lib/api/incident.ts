import { type IncidentGet, type IncidentUpsert } from "@dbm";
import { APIRoute } from "./base";


export class IncidentAPIRoute extends APIRoute<IncidentUpsert, IncidentGet, true> {
    public static instance = new IncidentAPIRoute();
    public override path = "/incident";
}