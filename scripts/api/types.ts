import type { UnwrapArray } from "../types";
import type { api } from "./api";
import type { fetchNodes } from "./fetchNodes";

export type Api = typeof api;

export type FigmaNode = UnwrapArray<Awaited<ReturnType<typeof fetchNodes>>>;
