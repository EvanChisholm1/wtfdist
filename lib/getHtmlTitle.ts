function getHtmlTitle(html: string) {
  const regex = /<title>.*?<\/title>/gm;
  const matches = html.match(regex);
  if (!matches || !matches[0]) return null;

  const title = matches[0].replace("<title>", "").replace("</title>", "");
  return title;
}

export default getHtmlTitle;
