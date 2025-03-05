import type { Prisma } from "@prisma/client";
import { incidentInclude, type IncidentUpsert } from "@dbm/incident";
import { APIRoute } from "./base";


export type IncidentGet = Prisma.IncidentGetPayload<{ include: typeof incidentInclude }>;

export class IncidentAPIRoute extends APIRoute<IncidentUpsert, IncidentGet, true> {
    public static instance = new IncidentAPIRoute();
    public override path = "/incident";
}