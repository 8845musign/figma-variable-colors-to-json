import type { fetchNodes } from "../api/fetchNodes";
import type { FigmaNode } from "../api/types";
import type { Token } from "../types";

export const nodesToTokens = (nodes: FigmaNode[]): Token[] => {
	return nodes.map((n) => {
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
};
