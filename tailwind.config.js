/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		colors: {
			'black':{
				DEFAULT:'rgb(15,15,15)',
				'hover': '#0a0a0ab0'
			},
			'white': {
				DEFAULT: '#ffff',
				'hover': '#ffffffb0'
			},
			'red': '#B50706',
			'grey': {
				DEFAULT:'#9ca3af',
				'hover': '#9ca3af66'
			},
			'dark-grey': '#404040',
			'transparent': 'transparent'
		},
		fontFamily:{
			'primary': 'var(--font-primary)',
			'secondary': 'var(--font-secondary)'
		},
		fontWeight:{
			'regular': '300',
			'semi-bold': '400',
			'bold': '600',
			'extra-bold': '700'
		},
		extend: {
			screens:{
				xxs: '320px'
			}
		},
	},
	plugins: [],
}
