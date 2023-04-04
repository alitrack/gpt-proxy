import { serve } from "https://deno.land/std@0.182.0/http/server.ts";
import { exists } from "https://deno.land/std@0.182.0/fs/mod.ts";

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
            const isReadableFile = await exists("./index.html", {
                isReadable: true,
                isFile: true
            });
            if (isReadableFile == false) {
                const res = await fetch("https://raw.githubusercontent.com/xqdoo00o/chatgpt-web/main/index.html");
                const index = await res.text();
                await Deno.writeTextFile("index.html", index);
            }
            return new Response(await Deno.readTextFile("./index.html"), {
                headers: {
                    "content-type": "text/html;charset=UTF-8",
                },
            });
    }
});