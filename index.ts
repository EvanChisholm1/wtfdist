import {
  Application,
  Router,
  Context,
} from "https://deno.land/x/oak@v9.0.1/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import search from "./lib/search.ts";
import scrubHtml from "./lib/scrubHtml.ts";
import fetchHtml from "./lib/fetchHtml.ts";
import indexAndSave from "./lib/indexAndSave.ts";
import getHtmlTitle from "./lib/getHtmlTitle.ts";

const app = new Application();
const router = new Router();

app.use(oakCors({ origin: "*" }));

router.get("/search", async (ctx: Context) => {
  const query = ctx.request.url.searchParams.get("q");
  console.log("searching for", query);
  const results = await search(query || "");
  ctx.response.body = results;
});

router.post("/webpage", async (ctx: Context) => {
  if (ctx.request.hasBody) {
    const result = ctx.request.body({ type: "json" });
    const body = await result.value;
    console.log(result);
    console.log(body);
    console.log(typeof body);

    if (!body.url)
      return (ctx.response.body = { error: "error: no url field in body" });

    const html = await fetchHtml(body.url);
    const text = await scrubHtml(html);
    const title = getHtmlTitle(html);
    await indexAndSave({
      content: text,
      title: title ? title : undefined,
      link: body.url,
    });

    ctx.response.body = {
      message: "successfully added webpage to index",
    };
  } else {
    ctx.response.body = {
      error: "error: no body",
    };
  }
});

router.post("/document", async (ctx: Context) => {
  if (ctx.request.hasBody) {
    const result = ctx.request.body({ type: "json" });
    const body = await result.value;
    console.log(result);
    console.log(body);
    console.log(typeof body);

    if (!body.text)
      return (ctx.response.body = { error: "error: no text field in body" });

    await indexAndSave({
      content: body.text,
      title: body.title ? body.title : undefined,
      link: body.url,
    });

    ctx.response.body = {
      message: "successfully added document to index",
    };
  } else {
    ctx.response.body = {
      error: "error: no body",
    };
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 4000 });
