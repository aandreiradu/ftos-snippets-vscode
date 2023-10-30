import * as path from "path";
import * as fs from "fs/promises";
import { format, Config } from "prettier";

interface CodeSnippet {
  prefix: string;
  description: string;
}

const pathToSnippetsPath = path.join(
  __dirname,
  "../snippets/ftos-snippets.json",
);
const jsonPackagePath = path.join(__dirname, "../package.json");
const templateFilePath = path.join(__dirname, "../templates/readme.md");
