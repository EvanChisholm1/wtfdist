import scrubHtml from "./lib/scrubHtml.ts";
import fetchHtml from "./lib/fetchHtml.ts";
import indexAndSave from "./lib/indexAndSave.ts";
import getHtmlTitle from "./lib/getHtmlTitle.ts";

for (let i = 1; i < 1000; i++) {
  const res = await fetch("https://en.wikipedia.org/wiki/Special:Random");
  const html = await res.text();
  const text = await scrubHtml(html);
  const title = getHtmlTitle(html);
  await indexAndSave({
    content: text,
    title: title ? title : undefined,
    link: res.url,
  });
}
