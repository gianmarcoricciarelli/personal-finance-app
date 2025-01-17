/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.tsx'],
    theme: {
        extend: {
            boxShadow: ({ theme }) => ({
                'sm-solid-pfa-beige-500': `0 0 0 2px ${theme(
                    'colors.pfa-beige-500'
                )}`,
                'sm-solid-pfa-grey-300': `0 0 0 2px ${theme(
                    'colors.pfa-grey-300'
                )}`,
            }),
            colors: {
                'pfa-beige-100': '#F8F4F0',
                'pfa-beige-500': '#98908B',
                'pfa-cyan': '#82C9D7',
                'pfa-green': '#277C78',
                'pfa-grey-100': '#F2F2F2',
                'pfa-grey-300': '#B3B3B3',
                'pfa-grey-500': '#696868',
                'pfa-grey-900': '#201F24',
                'pfa-navy': '#626070',
                'pfa-purple': '#826CB0',
                'pfa-red': '#C94736',
                'pfa-white': '#FFFFFF',
                'pfa-yellow': '#F2CDAC',
            },
            gridTemplateColumns: {
                'bills-table': '2fr 1fr 1fr',
                'transactions-table': '2fr 1fr 1fr 1fr',
            },
            screens: {
                mobile: {
                    max: '375px',
                },
                tablet: {
                    min: '376px',
                    max: '768px',
                },
                desktop: {
                    min: '769px',
                },
            },
        },
    },
    plugins: [],
}
