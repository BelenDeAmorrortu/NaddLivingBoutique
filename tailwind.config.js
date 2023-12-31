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
				DEFAULT:'#0f0f0f',
				'hover': '#0f0f0f99'
			},
			'white': {
				DEFAULT: '#ffff',
				'hover': '#ffffff78'
			},
			'red': '#B50706',
			'grey': {
				DEFAULT:'#9ca3af',
				'hover': '#9ca3af66'
			},
			'dark-grey': '#404040',
			'transparent': 'transparent',
			'whatsapp': '#31b846',
			'instagram': '#ba0e59'
			// 'instagram': '#a02ebf'

		},
		fontFamily:{
			'primary': 'var(--font-primary)',
			'secondary': 'var(--font-secondary)'
		},
		fontWeight:{
			'thin': '300',
			'regular': '400',
			'semi-bold': '500',
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
