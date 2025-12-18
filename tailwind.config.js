/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: '#FFB7C5',       // Hồng phấn hoa anh đào
          darkPink: '#F48FB1',   // Hồng đậm (cho nút/viền)
          sky: '#87CEEB',        // Xanh bầu trời Ghibli
          grass: '#A2D149',      // Xanh cỏ
          cream: '#FFFBF0',      // Màu kem nền giấy
        }
      },
      fontFamily: {
        hand: ['"Patrick Hand"', 'cursive'], // Font viết tay
        sans: ['"Nunito"', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite', // Hiệu ứng bay bay
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}