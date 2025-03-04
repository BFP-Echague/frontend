import type { Prisma } from "@prisma/client";
import { barangayInclude, type BarangayUpsert } from "@dbm/barangay";
import { APIRoute } from "./base";


export type BarangayGet = Prisma.BarangayGetPayload<{ include: typeof barangayInclude }>;

export class BarangayAPIRoute extends APIRoute<BarangayUpsert, BarangayGet> {
    public static instance = new BarangayAPIRoute();
    public override path = "/barangay";
}