// compiler/index.ts - Point d'entrée du compilateur
import * as fs from "fs";
import * as path from "path";

import { parseTemplate } from "./template-parser";
import { generateCode } from "./code-generator";

export function compile(sourcePath: string, outputPath: string): void {
	const sourceCode = fs.readFileSync(sourcePath, "utf-8");

	const ast = parseTemplate(sourceCode);

	const compiledCode = generateCode(ast);

	fs.writeFileSync(outputPath, compiledCode);
}
