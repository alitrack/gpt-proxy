import { serve } from "https://deno.land/std@0.182.0/http/server.ts";

const OPENAI_API_HOST = "api.openai.com";

serve(async (request) => {
    const url = new URL(request.url);
    url.protocol = "https";
    switch (url.pathname) {
        case '/v1/chat/completions':
            url.host = OPENAI_API_HOST;
            return await fetch(url, request);
            break;
        default:
            return new Response(await Deno.readTextFile("./index.html"), {
                headers: {
                    "content-type": "text/html;charset=UTF-8",
                },
            });
    }
});