export const load = async ({ cookies }) => {
    const sessionId = cookies.get("sessionId");
    if (sessionId) {
        console.log(sessionId);
    }

    return {};
};