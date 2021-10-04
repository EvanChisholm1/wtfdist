import Index from "../types/index.ts";

async function findRecordsByWord(...words: string[]): Promise<{
  [word: string]: Array<{ documentId: string; timesAppeared: number }>;
}> {
  const index: Index = JSON.parse(
    await Deno.readTextFile("./db/index/index.json")
  );

  const returnObj: {
    [word: string]: Array<{ documentId: string; timesAppeared: number }>;
  } = {};
  for (const word of words) {
    if (index.words[word]) {
      returnObj[word] = index.words[word].documents;
    }
  }

  return returnObj;
}

export default findRecordsByWord;
