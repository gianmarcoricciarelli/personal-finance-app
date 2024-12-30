/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.tsx'],
    theme: {
        extend: {
            colors: {
                'pfa-beige-100': '#F8F4F0',
                'pfa-beige-500': '#98908B',
                'pfa-grey-100': '#F2F2F2',
                'pfa-grey-300': '#B3B3B3',
                'pfa-grey-500': '#696868',
                'pfa-grey-900': '#201F24',
                'pfa-green': '#277C78',
                'pfa-yellow': '#F2CDAC',
            },
        },
    },
    plugins: [],
}
