import * as path from "path";
import * as fs from "fs/promises";
import { format, Config } from "prettier";

interface CodeSnippet {
  prefix: string;
  description: string;
}

const snippetsPath = path.join(__dirname, "../snippets/ftos-snippets.json");
const packageJsonPath = path.join(__dirname, "../package.json");
const templateFilePath = path.join(__dirname, "../templates/readme.md");
const readMeFilePath = path.join(__dirname, "../README.md");
const tableArr = ["| Keyword | Description |\n", "|---------|-------------|\n"];

async function main() {
  const [snippetsContent, packageJsonContent, templateContent] =
    await Promise.all([
      fs.readFile(snippetsPath, "utf-8"),
      fs.readFile(packageJsonPath, "utf-8"),
      fs.readFile(templateFilePath, "utf-8"),
    ]);

  const { prettier: prettierOptions } = JSON.parse(packageJsonContent) as {
    prettier: Config;
  };
  prettierOptions.parser = "markdown";

  const snippets = Object.values(JSON.parse(snippetsContent)) as CodeSnippet[];
  for (const snippet of snippets) {
    tableArr.push(`| ${snippet.prefix} | ${snippet.description} |\n`);
  }

  const table = tableArr.join("");
  const content = templateContent.replace("{{ SNIPPETS-TABLE }}", table);
  const readMe = await format(content, prettierOptions);
  await fs.writeFile(readMeFilePath, readMe);
}

try {
  main();
} catch (error) {
  console.error(error);
  process.exit(1);
}
