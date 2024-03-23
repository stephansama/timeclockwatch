import { addDynamicIconSelectors } from "@iconify/tailwind";
import { type Config } from "tailwindcss";

export default {
	darkMode: "class",
	content: ["./index.html", "./src/**/*.{svelte,css,ts}"],
	theme: {
		extend: {},
		debugScreens: {
			style: {
				color: "whitesmoke",
				padding: "10px",
				backdropFilter: "blur(8px)",
				backgroundColor: "rgba(0,0,0,.4)",
			},
		},
	},
	plugins: [
		addDynamicIconSelectors(),
		require("@tailwindcss/forms"),
		require("tailwindcss-debug-screens"),
	],
} satisfies Config;
