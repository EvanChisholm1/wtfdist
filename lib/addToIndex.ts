import WordIndex from "../types/wordIndex.ts";
import Index from "../types/index.ts";
import Document from "../types/document.ts";

async function addToIndex(document: Document) {
  const indexFile = await Deno.readTextFile("./db/index/index.json");
  const index: Index = JSON.parse(indexFile);

  for (const word of Object.keys(document.tokens)) {
    addWordToIndex(word, document.tokens[word], document.id, index);
  }

  await Deno.writeTextFile("./db/index/index.json", JSON.stringify(index));
}

function addWordToIndex(
  word: string,
  timesAppeared: number,
  documentId: string,
  index: Index
) {
  // const indexFile = await Deno.readTextFile("./db/index/index.json");
  // const index: Index = JSON.parse(indexFile);

  let wordIndex: WordIndex | undefined = index.words[word];
  if (!wordIndex) {
    index.words[word] = { word, documents: [] };
    wordIndex = index.words[word];
  }

  // if there are no documents add the document to the list
  if (!wordIndex.documents[0]) {
    wordIndex.documents.push({ documentId, timesAppeared });
  } else if (
    // if the amount of times appeared is 1 or less than the lowest add the document to the end of the list
    timesAppeared === 1 ||
    timesAppeared <
      wordIndex.documents[wordIndex.documents.length - 1].timesAppeared
  ) {
    wordIndex.documents.push({ documentId, timesAppeared });
  } else if (timesAppeared >= wordIndex.documents[0].timesAppeared) {
    // if times appeared is greater the the first document add the document to the start of the list
    wordIndex.documents.splice(0, 0, { documentId, timesAppeared });
  } else {
    // loop through the list until the first document is greater than the amount of times appeared and the next one is less than
    for (let i = 1; i < wordIndex.documents.length; i++) {
      if (
        timesAppeared >= wordIndex.documents[i].timesAppeared &&
        timesAppeared < wordIndex.documents[i - 1].timesAppeared
      ) {
        wordIndex.documents.splice(i, 0, { documentId, timesAppeared });
      }
    }
  }

  // await Deno.writeTextFile("./db/index/index.json", JSON.stringify(index));
}

// async function addToIndexold(
//   word: string,
//   timesAppeared: number,
//   documentId: string
// ) {
//   let wordIndex: WordIndex = {
//     word: word,
//     documents: [],
//   };

//   try {
//     const wordFile = await Deno.readTextFile(`./db/index/index.json`);
//     wordIndex = JSON.parse(wordFile);
//   } catch (err) {
//     console.error(err);
//   }

//   if (!wordIndex.documents[0])
//     wordIndex.documents.push({ documentId, timesAppeared });
//   else if (
//     timesAppeared === 1 ||
//     timesAppeared <
//       wordIndex.documents[wordIndex.documents.length - 1].timesAppeared
//   )
//     wordIndex.documents.push({ documentId, timesAppeared });
//   else if (timesAppeared >= wordIndex.documents[0].timesAppeared)
//     wordIndex.documents.splice(0, 0, { documentId, timesAppeared });
//   else {
//     for (let i = 1; i < wordIndex.documents.length; i++) {
//       if (
//         timesAppeared >= wordIndex.documents[i].timesAppeared &&
//         timesAppeared < wordIndex.documents[i - 1].timesAppeared
//       ) {
//         wordIndex.documents.splice(i, 0, { documentId, timesAppeared });
//       }
//     }
//   }

//   console.log("made it here");

//   await Deno.writeTextFile(
//     `./db/index/${word}.json`,
//     JSON.stringify(wordIndex)
//   );
// }

export default addToIndex;
