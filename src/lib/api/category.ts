import { type CategoryGet, type CategoryUpsert } from "@dbm";
import { APIRoute } from "./base";

export class CategoryAPIRoute extends APIRoute<CategoryUpsert, CategoryGet> {
    public static instance = new CategoryAPIRoute();
    public override path = "/category";
}