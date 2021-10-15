import Document from "./types/document.ts";
import addToIndex from "./lib/addToIndex.ts";

for await (const dirEntry of Deno.readDir("./db/records")) {
  console.log(dirEntry.name);
  const file = await Deno.readTextFile(`./db/records/${dirEntry.name}`);
  const doc: Document = JSON.parse(file);

  for (const word of Object.keys(doc.tokens)) {
    await addToIndex(word, doc.tokens[word], doc.id);
  }
}

console.log("done");
