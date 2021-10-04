import Document from "../types/document.ts";
import { tokenize, indexTokens } from "./tokenizer.ts";

function indexDocument({
  title,
  content,
  link,
}: {
  title?: string;
  content: string;
  link?: string;
}): Document {
  const tokens = tokenize(content);
  const indexedTokens = indexTokens(tokens);
  if (indexedTokens[""]) {
    delete indexedTokens[""];
  }

  return {
    content: content,
    id: crypto.randomUUID(),
    title: title ? title : content.substr(0, 50),
    tokens: indexedTokens,
    link: link,
  };
}

export default indexDocument;
