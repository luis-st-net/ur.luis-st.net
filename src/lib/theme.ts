export const THEME_STORAGE_KEY = "ur-theme";

export const THEME_KEYS = ["blue", "green", "crimson", "indigo", "orange"] as const;
export type ThemeKey = (typeof THEME_KEYS)[number];

export const DEFAULT_THEME: ThemeKey = "blue";

/** Swatch color shown next to each option in the theme switcher. */
export const THEME_SWATCH: Record<ThemeKey, string> = {
	blue: "#1D4ED8",
	green: "#047857",
	crimson: "#B91C1C",
	indigo: "#4338CA",
	orange: "#B45309",
};

/**
 * Applies the stored theme before first paint, avoiding a flash of the
 * default accent color. Inlined as a blocking <script> in the root layout.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
	THEME_STORAGE_KEY,
)});if(t&&${JSON.stringify(THEME_KEYS)}.indexOf(t)!==-1){document.documentElement.setAttribute("data-theme",t);}}catch(e){}})();`;
