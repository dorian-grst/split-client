/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'red-bis': '#ffeaea',
                'green-primary': '#34a25b',
                'green-secondary': '#8ba04d',
                'purple-primary': '#98287d',
                'purple-secondary': '#3054a1',
                'light-gray': '#e6e6e6',
                'gray-bis': '#e9edf3',
                'black-second': '#393E42',
                'dark-black': '#000000',
                discord: '#5865f2',
            },
            screens: {
                laptopl: '1440px',
            },
            fontFamily: {
                montserrat: ['Montserrat'],
            },
            backgroundImage: {
                abstract: 'url("/src/assets/background.svg")',
            },
        },
    },
    plugins: [],
    corePlugins: {
        preflight: false,
    },
};
