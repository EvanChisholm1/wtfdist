function removeStopWords(text: string) {
  const wordArray = text.split(" ");

  const cleanedString = wordArray
    .filter(word => !stopwords.includes(word))
    .join(" ");
  console.log(text, "->", cleanedString);
  return cleanedString;
}

export default removeStopWords;

const stopwords = [
  "the",
  "be",
  "to",
  "of",
  "and",
  "a",
  "in",
  "is",
  "on",
  "as",
  "do",
  "at",
  "or",
  "an",
  "if",
  "can",
  "its",
  "it's",
];
