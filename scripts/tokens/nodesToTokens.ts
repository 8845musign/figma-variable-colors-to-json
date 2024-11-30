import type { fetchNodes } from "../api/fetchNodes";
import type { Awaited, Token } from "../types";

type ReturnFetchNodes = Awaited<ReturnType<typeof fetchNodes>>;

export const nodesToTokens = (nodes: ReturnFetchNodes): Token[] => {
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
