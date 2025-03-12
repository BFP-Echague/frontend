import { z } from "zod";

export function getZodErrorMessage(e: z.ZodError) {
    const issues = e.issues.map((x) => `${x.path.join(" -> ")}: ${x.message}`);

    return `
        You have issues with your inputs.\n
        \n
        ${issues.join("\n")}
    `;
}


export function handlePossibleZodError(e: unknown) {
    if (e instanceof z.ZodError) {
        alert(getZodErrorMessage(e));
        return true;
    }

    return false;
}