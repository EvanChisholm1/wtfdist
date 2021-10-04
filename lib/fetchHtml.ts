async function fetchHtml(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.headers.get("content-type")?.includes("text/html")) {
    throw new Error(
      `Cannot fetch html because file type is ${res.headers.get(
        "content-type"
      )}`
    );
  }
  const html = await res.text();
  return html;
}

export default fetchHtml;
