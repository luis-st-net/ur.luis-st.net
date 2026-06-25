declare module "@retorquere/bibtex-parser" {
	export interface Creator {
		firstName?: string;
		lastName?: string;
		prefix?: string;
		suffix?: string;
		name?: string;
	}
	
	export interface Entry {
		key: string;
		type: string;
		fields: Record<string, unknown>;
	}
	
	export interface Bibliography {
		entries: Entry[];
		errors: unknown[];
	}
	
	export interface ParserOptions {
		raw?: boolean;
		
		[key: string]: unknown;
	}
	
	export function parse(input: string, options?: ParserOptions): Bibliography;
	
	export function parseAsync(input: string, options?: ParserOptions): Promise<Bibliography>;
}
