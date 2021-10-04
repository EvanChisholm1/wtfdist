interface WordIndex {
  word: string;
  documents: Array<{ documentId: string; timesAppeared: number }>;
}

export default WordIndex;
