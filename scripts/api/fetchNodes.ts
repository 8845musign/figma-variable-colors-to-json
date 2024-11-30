import type { Api } from "./types";

export const fetchNodes = async (api: Api, nodeIds: string[]) => {
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
