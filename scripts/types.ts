export type Token = {
	name: string;
	color: {
		r: number;
		g: number;
		b: number;
		a: number;
	};
};

export type Awaited<T> = T extends Promise<infer R> ? R : never;
