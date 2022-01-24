import { defineConfig } from "vite-plugin-windicss";
import typography from "windicss/plugin/typography";

/**
 * Creates bullshit css variables that support transparency
 * @author Bluskript
 */
const withOpacityValue = (cssVariable: string) => ({ opacityVariable, opacityValue }) => {
	if (opacityValue) {
		if (opacityVariable) return `rgba(var(--${cssVariable}), var(${opacityVariable}, 1))`;
		return `rgba(var(--${cssVariable}), ${opacityValue})`;
	}
	return `rgb(var(--${cssVariable}))`;
};

export default defineConfig({
	darkMode: "class",
	plugins: [typography()],
	theme: {
		extend: {
			colors: {
				"text": withOpacityValue("color-text"),
				"caution": withOpacityValue("color-caution"),
				"active": withOpacityValue("color-active"),
				"100mbps": withOpacityValue("color-100mbps"),
				"1000mbps": withOpacityValue("color-1000mbps"),
				"10000mbps": withOpacityValue("color-10000mbps"),
				"background": {
					200: withOpacityValue("color-background-200"),
					300: withOpacityValue("color-background-300"),
					400: withOpacityValue("color-background-400"),
					500: withOpacityValue("color-background-500"),
					600: withOpacityValue("color-background-600"),
				},
				"tooltip": {
					background: withOpacityValue("color-tooltip-background"),
					text: withOpacityValue("color-tooltip-text"),
				},
				"primary": {
					300: withOpacityValue("color-primary-300"),
					400: withOpacityValue("color-primary-400"),
					500: withOpacityValue("color-primary-500"),
				},
			},
		},
	},
});
