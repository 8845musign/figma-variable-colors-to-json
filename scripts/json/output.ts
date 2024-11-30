import fs from "node:fs";
import path from "node:path";
import type { Token } from "../types";

const checkDir = (path: string) => {
	if (!fs.existsSync(path)) {
		fs.mkdirSync(path, { recursive: true });
	}
};

export const output = (tokens: Token[]) => {
	const directoryPath = path.join(process.cwd(), "dist");

	checkDir(directoryPath);

	const outputPath = path.join(directoryPath, "tokens.json");
	fs.writeFileSync(outputPath, JSON.stringify(tokens), "utf8");
};
