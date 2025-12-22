/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 1. BẢNG MÀU
      colors: {
        brand: {
          pink: '#FFB7C5',      
          darkPink: '#F48FB1',  
          deepPink: '#C2185B',  
          sky: '#87CEEB',       
          grass: '#A2D149',     
          cream: '#FFFBF0',     
          light: '#FFF0F5',     
        }
      },
      
      // 2. FONT CHỮ
      fontFamily: {
        hand: ['"Patrick Hand"', 'cursive'], 
        sans: ['"Nunito"', 'sans-serif'],
      },

      // 3. KÍCH THƯỚC (SPACING / WIDTH / HEIGHT)
      spacing: {
        'safe-top': '8rem',     // pt-32
      },
      
      // 👇 ĐÃ GỘP TẤT CẢ WIDTH VÀO ĐÂY
      width: {
        'booth-card': '340px',  // Khung thẻ ở Home
        'strip': '160px',       // Dải ảnh (cho StripLayout)
      },

      height: {
        'booth-card': '450px',  
      },
      borderRadius: {
        'booth': '3rem',        
      },

      // 4. ANIMATION
      animation: {
        'float': 'float 3s ease-in-out infinite',        
        'spin-slow': 'spin 8s linear infinite',          
        'bounce-slow': 'bounce 3s infinite',             
        'fade-in': 'fadeIn 0.5s ease-out',               
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}