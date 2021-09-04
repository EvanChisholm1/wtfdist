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

console.log(
  indexDocument({
    content: `Deno is a simple, modern and secure runtime for JavaScript and TypeScript that uses V8 and is built in Rust.

Secure by default. No file, network, or environment access, unless explicitly enabled.
Supports TypeScript out of the box.
Ships only a single executable file.
Has built-in utilities like a dependency inspector (deno info) and a code formatter (deno fmt).
Has a set of reviewed (audited) standard modules that are guaranteed to work with Deno: deno.land/std
`,
    title: "What is deno",
    link: "https://deno.land",
  })
);
