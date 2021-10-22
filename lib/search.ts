import Document from "../types/document.ts";
import { tokenize } from "./tokenizer.ts";
import findRecordsByWord from "./findRecordsByWord.ts";
import rank from "./rank.ts";
import removeStopWords from "./removeStopWords.ts";

async function search(query: string): Promise<Document[]> {
  const tokens = tokenize(removeStopWords(query));
  // const tokens = tokenize(query);
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

  // only get the records that include all the search terms
  const validRecords = allRecords.filter(record => {
    let includesAllTerms = true;
    for (const term of tokens) {
      const includesTerm = record.tokens[term];
      if (!includesTerm) {
        includesAllTerms = false;
      }
    }

    return includesAllTerms;
  });

  const rankedRecords = rank(tokens, validRecords);

  return rankedRecords;
}

export default search;
