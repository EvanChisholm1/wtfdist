import Document from "../types/document.ts";
import { tokenize } from "./tokenizer.ts";
import findRecordsByWord from "./findRecordsByWord.ts";
import rank from "./rank.ts";

async function search(query: string): Promise<Document[]> {
  const tokens = tokenize(query);
  const recordIds = await findRecordsByWord(...tokens);

  const allRecords: Document[] = [];
  const usedIds: { [id: string]: boolean } = {};

  for (const word of Object.keys(recordIds)) {
    for (const { documentId } of recordIds[word]) {
      if (!usedIds[documentId]) {
        usedIds[documentId] = true;
        allRecords.push(
          JSON.parse(await Deno.readTextFile(`./db/records/${documentId}.json`))
        );
      }
    }
  }

  const rankedRecords = rank(tokens, allRecords);

  return rankedRecords;
}

console.log(
  (await search("computer")).map(doc => ({
    title: doc.title,
    url: doc.link,
  }))
);

export default search;
