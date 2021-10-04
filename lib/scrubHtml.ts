import {
  DOMParser,
  // Element,
  Node,
  NodeType,
} from "https://deno.land/x/deno_dom@v0.1.15-alpha/deno-dom-wasm.ts";

function scrubHtml(html: string): string {
  const document = new DOMParser().parseFromString(html, "text/html");
  document?.querySelectorAll("code").forEach(node => node.remove());
  document?.querySelectorAll("script").forEach(node => node.remove());
  document?.querySelectorAll("pre").forEach(node => node.remove());
  document?.querySelectorAll("style").forEach(node => node.remove());
  document?.querySelectorAll("embed").forEach(node => node.remove());
  document?.querySelectorAll("header").forEach(node => node.remove());
  document?.querySelectorAll("footer").forEach(node => node.remove());
  document?.querySelectorAll("nav").forEach(node => node.remove());
  document?.querySelectorAll("img").forEach(node => node.remove());

  let text = "";
  let lastWasBlank = true;

  const getTextFromNode = (node: Node) => {
    if (node.nodeType === NodeType.TEXT_NODE) {
      if (!node.textContent.replace(/\s/g, "").length) {
        if (lastWasBlank) return;
        else {
          lastWasBlank = true;
          return (text = `${text} \n \n`);
        }
      }
      lastWasBlank = false;
      return (text = `${text} ${node.textContent}`);
    }

    node.childNodes.forEach(getTextFromNode);
  };

  document?.childNodes.forEach(getTextFromNode);

  return text;
}

export default scrubHtml;
