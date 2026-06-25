import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: "class",
	content: [
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			screens: {
				"xs": "30rem",
				"3xl": "112rem",
			},
			fontFamily: {
				sans: ["var(--font-sans)", "system-ui", "sans-serif"],
				serif: ["var(--font-serif)", "Georgia", "serif"],
				mono: ["var(--font-mono)", "ui-monospace", "monospace"],
			},
			colors: {
				base: "var(--base)",
				surface: "var(--surface)",
				border: "var(--border)",
				ink: {
					DEFAULT: "var(--ink)",
					muted: "var(--ink-muted)",
					subtle: "var(--ink-subtle)",
				},
				accent: {
					DEFAULT: "var(--accent)",
					foreground: "var(--accent-foreground)",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
		},
	},
	plugins: [],
};

export default config;
