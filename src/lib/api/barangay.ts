import { type BarangayGet, type BarangayUpsert } from "@dbm";
import { APIRoute } from "./base";


export class BarangayAPIRoute extends APIRoute<BarangayUpsert, BarangayGet> {
    public static instance = new BarangayAPIRoute();
    public override path = "/barangay";
}