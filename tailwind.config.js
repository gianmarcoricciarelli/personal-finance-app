/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.tsx'],
    theme: {
        extend: {
            colors: {
                'beige-100': '#F8F4F0',
                'beige-500': '#98908B',
                'grey-100': '#F2F2F2',
                'grey-300': '#B3B3B3',
                'grey-500': '#696868',
                'grey-900': '#201F24',
                'pfa-green': '#277C78',
            },
        },
    },
    plugins: [],
}
