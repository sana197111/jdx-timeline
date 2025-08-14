// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'jdx-blue': {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        }
      },
      fontFamily: {
        'sans': ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'sans-serif'],
        'mono': ['SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
        'bounce': 'bounce 1s infinite',
        'fade-in': 'fadeIn 0.5s ease-in',
        'fade-out': 'fadeOut 0.5s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'slide-out': 'slideOut 0.3s ease-in',
        'slide-horizontal': 'slideHorizontal 15s linear infinite',
        'slide-vertical': 'slideVertical 10s ease-in-out infinite',
        'float-up': 'floatUp 8s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'marquee': 'marquee 30s linear infinite',
        'gradient': 'gradient 3s ease infinite',
        'ripple': 'ripple 1.5s ease-out infinite',
        'bounce-in': 'bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(10px)', opacity: '0' },
        },
        slideHorizontal: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        slideVertical: {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(10px)', opacity: '0' },
        },
        floatUp: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0.3' },
          '50%': { opacity: '0.6' },
          '100%': { transform: 'translateY(-200px) scale(0.5)', opacity: '0' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33.33%)' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        ripple: {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backgroundSize: {
        '300%': '300% 300%',
      },
      transitionDelay: {
        '0': '0ms',
        '100': '100ms',
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
        '600': '600ms',
        '700': '700ms',
        '800': '800ms',
        '900': '900ms',
        '1000': '1000ms',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}