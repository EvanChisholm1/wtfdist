interface Document {
  id: string;
  title: string;
  content: string;
  tokens: {
    [key: string]: number;
  };
  link?: string;
}

export default Document;
