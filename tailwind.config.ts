import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        green: '#1DB954', // Your custom green color
        white: '#FFFFFF', // Your custom white color
        black: '#191414', // Your custom black color
        purple: '#541DB9', // Your custom purple color
        accent: '#B9541D', // Your custom accent color
        background: '#1DB954', // Your custom accent color
        buttons: '#FFFFFF', // Your custom accent color
        hover: '#B3B3B3', // Your custom accent color
        playlist: '#191414', // Your custom accent color
        // You can add more custom colors as needed
      },
    },
  },
  plugins: [],
}
export default config
