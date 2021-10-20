import Document from "./types/document.ts";

const ID = "2b1cb3e8-0711-469c-865e-7812bdf82aa7";

const text = await Deno.readTextFile(`db/records/${ID}.json`);
const doc: Document = JSON.parse(text);

let mostCommonWord = "";
let largestNumber = 0;

Object.keys(doc.tokens).forEach(word => {
  if (doc.tokens[word] > largestNumber) {
    largestNumber = doc.tokens[word];
    mostCommonWord = word;
  }
});

console.log(mostCommonWord, largestNumber);
