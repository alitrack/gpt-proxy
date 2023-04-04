import { serve } from "https://deno.land/std@0.182.0/http/server.ts";
import { exists } from "https://deno.land/std@0.182.0/fs/mod.ts";

const OPENAI_API_HOST = "api.openai.com";

const INDEX_URL = Deno.env.get("INDEX_URL")||"https://raw.githubusercontent.com/xqdoo00o/chatgpt-web/main/index.html"

let index = '';

serve(async (request) => {
    const url = new URL(request.url);
    url.protocol = "https";
    switch (url.pathname) {
        case '/v1/chat/completions':
            url.host = OPENAI_API_HOST;
            return await fetch(url, request);
            break;
        case '/_/BardChatUi/data/assistant.lamda.BardFrontendService/StreamGenerate':
            url.host = 'bard.google.com';
            return await fetch(url, request);
        //https://bard.google.com/_/BardChatUi/data/assistant.lamda.BardFrontendService/StreamGenerate?
        break;
        case '/faq':    //https://bard.google.com/faq
            url.host = 'bard.google.com';
            return await fetch(url, request);
        break;        
        default:
            if (index == '') {
                const res = await fetch(INDEX_URL);
                index = await res.text();
            }
            return new Response(index, {
                headers: {
                    "content-type": "text/html;charset=UTF-8",
                },
            });
    }
});