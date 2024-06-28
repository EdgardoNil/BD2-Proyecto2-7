/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-100':'#0077C2',
        'primary-200':'#59a5f5',
        'primary-300':'#c8ffff',
        'accent-100':'#00BFFF',
        'accent-200':'#00619a',
        'text-100':'#333333',
        'text-200':'#5c5c5c',
        'bg-100':'#e9e5e5',
        'bg-200':'#dfdbdb',
        'bg-300':'#b7b3b3'
      }
    },
  },
  plugins: [],
}

