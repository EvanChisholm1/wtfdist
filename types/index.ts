import WordIndex from "./wordIndex.ts";

interface Index {
  words: {
    [word: string]: WordIndex;
  };
}

export default Index;
