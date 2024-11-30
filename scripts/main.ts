import { api } from "./api/api";
import { fetchComponents } from "./api/fetchComponents";
import { fetchNodes } from "./api/fetchNodes";
import { output } from "./json/output";
import { nodesToTokens } from "./tokens/nodesToTokens";
import type { Token } from "./types";

export async function main() {
	try {
		const components = await fetchComponents(api);
		const componentNodeIds = components.map((component) => component.node_id);
		const nodes = await fetchNodes(api, componentNodeIds);
		const tokens: Token[] = nodesToTokens(nodes);

		output(tokens);
	} catch (error) {
		console.error(error);
	}
}

main();
