/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {colors:{
			darkColor : "#FFFFFF",
			sideBarDarkColor : "#1E1E2D",
			backgroundDarkColor : "#151521"
		}
		},
	},
	plugins: [],
};

// const withMT = require("@material-tailwind/react/utils/withMT");

// module.exports = withMT({
// 	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
// 	theme: {
// 		extend: {},
// 	},
// 	plugins: [],
// });
