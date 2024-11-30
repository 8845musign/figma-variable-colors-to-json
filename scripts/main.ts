import { api } from "./figma/api";
import { fetchComponents } from "./figma/fetchComponents";
import { fetchNodes } from "./figma/fetchNodes";
import { output } from "./json/output";
import type { Token } from "./types";

export async function main() {
	try {
		const components = await fetchComponents(api);
		const componentNodeIds = components.map((component) => component.node_id);
		const nodes = await fetchNodes(api, componentNodeIds);
		const tokens: Token[] = nodes.map((n) => {
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

		output(tokens);
	} catch (error) {
		console.error(error);
	}
}

main();
