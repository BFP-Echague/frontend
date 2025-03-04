import type { Prisma } from "@prisma/client";
import { categoryInclude, type CategoryUpsert } from "@dbm/category";
import { APIRoute } from "./base";


export type CategoryGet = Prisma.CategoryGetPayload<{ include: typeof categoryInclude }>;

export class CategoryAPIRoute extends APIRoute<CategoryUpsert, CategoryGet> {
    public static instance = new CategoryAPIRoute();
    public override path = "/category";
}