const punct = '.,:;?!#%*()[]{}\\|/<>~"-_';
const punctDict: { [key: string]: boolean } = {};
punct.split("").forEach(char => (punctDict[char] = true));

function removePunctuation(content: string): string {
  const newString = content
    .split("")
    .map(char => (punctDict[char] ? " " : char))
    .join("");

  return newString;
}

function removeNewline(content: string): string {
  const newString = content.replaceAll("\n", " ");
  return newString;
}

export function tokenize(content: string): string[] {
  const cleanContent = removePunctuation(removeNewline(content.toLowerCase()));
  const tokens = cleanContent.split(" ");
  return tokens;
}

export function indexTokens(tokens: string[]): { [key: string]: number } {
  const tokenMap: { [key: string]: number } = {};

  tokens.forEach(token => {
    if (tokenMap[token]) {
      tokenMap[token]++;
    } else {
      tokenMap[token] = 1;
    }
  });

  return tokenMap;
}
