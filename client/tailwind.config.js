import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"ubc-blue": "var(--color-ubc-blue)",
				"ubc-bg-primary": "var(--color-ubc-bg-primary)",
				"form-violet": "var(--color-form-violet)",
			},
		},
	},
	darkMode: "class",
	plugins: [
		heroui({
			themes: {
				light: {
					colors: {
						primary: {
							DEFAULT: "#4338ca",
							foreground: "#ffffff",
						},
						focus: "#000000",
					},
				},
				dark: {
					colors: {
						primary: {
							DEFAULT: "#4338ca",
							foreground: "#ffffff",
						},
						focus: "#000000",
					},
				},
			},
		}),
	],
};
