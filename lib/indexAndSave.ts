import indexDocument from "./indexDocument.ts";
import addToIndex from "./addToIndex.ts";

async function indexAndSave(options: {
  title?: string;
  content: string;
  link?: string;
}) {
  const indexedDoc = indexDocument(options);
  await Deno.writeTextFile(
    `./db/records/${indexedDoc.id}.json`,
    JSON.stringify(indexedDoc)
  );

  for (const word of Object.keys(indexedDoc.tokens)) {
    await addToIndex(word, indexedDoc.tokens[word], indexedDoc.id);
  }
}

export default indexAndSave;
