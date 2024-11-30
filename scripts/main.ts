import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import * as Figma from "figma-api";
import { type Api, api } from "./figma/api";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export const fetchComponents = async (api: Api) => {
	const result = await api.getFileComponents({
		file_key: process.env.FIGMA_FILE_KEY,
	});

	return result.meta.components;
};

export const fetchNodes = async (api: Api, nodeIds) => {
	const result = await api.getFileNodes(
		{
			file_key: process.env.FIGMA_FILE_KEY,
		},
		{
			ids: nodeIds.join(","),
		},
	);

	return Object.keys(result.nodes).map((key) => result.nodes[key]);
};

export async function main() {
	try {
		const components = await fetchComponents(api);
		const componentNodeIds = components.map((component) => component.node_id);
		const nodes = await fetchNodes(api, componentNodeIds);
		const tokens = nodes.map((n) => {
			const { document } = n;

			if (document.type !== "COMPONENT") {
				throw new Error("document is not COMPONENT");
			}

			const fill = document.fills[0];

			if (fill.type !== "SOLID") {
				throw new Error("Not support anything other than SOLID");
			}

			return {
				name: document.name,
				color: fill.color,
			};
		});

		// ディレクトリパスを取得
		const directoryPath = path.join(__dirname, "dist");

		// ディレクトリが存在しない場合は作成
		if (!fs.existsSync(directoryPath)) {
			fs.mkdirSync(directoryPath, { recursive: true });
		}

		const outputPath = path.join(directoryPath, "tokens.json");
		fs.writeFileSync(outputPath, JSON.stringify(tokens, null, 2), "utf8");
	} catch (error) {
		console.error(error);
	}
}

main();
