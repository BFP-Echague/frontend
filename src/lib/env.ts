import { parseEnvironmentVariables } from "@absxn/process-env-parser";


const result = parseEnvironmentVariables({
    BACKEND_API_URL: {}
});

if (!result.success) throw new Error("Invalid .env file, or you didn't make one yet.");

export const env = result.env;