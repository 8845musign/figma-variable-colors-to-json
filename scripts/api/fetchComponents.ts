import type { Api } from "./types";

export const fetchComponents = async (api: Api) => {
	const result = await api.getFileComponents({
		file_key: process.env.FIGMA_FILE_KEY,
	});

	return result.meta.components;
};
