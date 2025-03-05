import { z } from "zod";

const idParamSchema = z.coerce.number().int().min(0);
export function parseIdParam(id: string | undefined) {
    return idParamSchema.parse(id);
}