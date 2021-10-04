import Document from "../types/document.ts";

interface DocumentWithScore extends Document {
  score: number;
}

export default function rank(query: string[], records: Document[]): Document[] {
  const scores: { [documentId: string]: number } = {};

  for (const term of query) {
    for (const record of records) {
      const termScore = TF_IDF(term, record, records);
      if (!scores[record.id]) scores[record.id] = 0;
      scores[record.id] += termScore;
    }
  }

  const documentsWithScores: DocumentWithScore[] = records.map(document => ({
    ...document,
    score: scores[document.id],
  }));
  const ranked = documentsWithScores.sort((a, b) => a.score - b.score);

  return ranked;
}

function TF(term: string, record: Document): number {
  const totalTerms =
    Object.keys(record.tokens)
      .map(word => record.tokens[word])
      .reduce((a, b) => a + b) || 0;

  const timesAppeared = record.tokens[term] || 0;

  return timesAppeared / totalTerms;
}

function IDF(term: string, records: Document[]): number {
  const numberOfDocuments = records.length;
  let documentsWithTerm = 0;

  records.forEach(record => {
    if (record.tokens[term]) documentsWithTerm++;
  });

  return Math.log(numberOfDocuments / documentsWithTerm);
}

function TF_IDF(term: string, record: Document, records: Document[]): number {
  return TF(term, record) * IDF(term, records);
}
