await Deno.mkdir("./db");
await Deno.mkdir("./db/index");
await Deno.mkdir("./db/records");

await Deno.writeTextFile(
  "./db/index/index.json",
  JSON.stringify({ words: {} })
);
