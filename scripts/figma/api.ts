import { Api as FigmaApi } from "figma-api";

const api = new FigmaApi({
	personalAccessToken: process.env.FIGMA_TOKENS,
});

type Api = typeof api;

export { api, type Api };
