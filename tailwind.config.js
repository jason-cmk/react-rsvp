/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'main-background': 
          "url('https://img.freepik.com/free-photo/grunge-vintage-old-paper-background_1373-431.jpg?w=1380&t=st=1681973617~exp=1681974217~hmac=05d9315ac53b0ba5ece4d4ed273c503a109500274f4c973cb5cc20e468c3eab1')"
      },
    },
  },
  plugins: [],
}
