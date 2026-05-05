/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ── MigiJames Design Tokens ──────────────────
      colors: {
        // Core palette (Dark Luxury)
        obsidian:  '#0a0806',
        charcoal:  '#1a1612',
        'warm-dark': '#2d2420',
        
        // Gold spectrum
        gold: {
          DEFAULT: '#c9a96e',
          light:   '#e8d5b0',
          bright:  '#d4af37',
          dark:    '#9a7a4a',
          pale:    '#f5ede0',
        },
        
        // Cream / ivory
        cream:  '#faf6f0',
        ivory:  '#f5ede0',
        
        // Muted tones
        mist:   '#b8a898',
        stone:  '#6b5d52',
        
        // Gem accent colors
        gem: {
          diamond:   '#e8f4fd',
          ruby:      '#c0392b',
          sapphire:  '#2980b9',
          emerald:   '#27ae60',
          amethyst:  '#8e44ad',
          citrine:   '#f39c12',
        },
      },
      
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body:    ['Sarabun', 'sans-serif'],
        script:  ['Libre Baskerville', 'serif'],
      },
      
      fontSize: {
        'display-xl': ['clamp(64px, 12vw, 140px)', { lineHeight: '1' }],
        'display-lg': ['clamp(40px, 7vw, 88px)',   { lineHeight: '1.05' }],
        'display-md': ['clamp(28px, 4vw, 56px)',   { lineHeight: '1.15' }],
        'display-sm': ['clamp(20px, 3vw, 36px)',   { lineHeight: '1.25' }],
      },
      
      letterSpacing: {
        'ultra':  '0.5em',
        'wide-2': '0.3em',
        'wide-3': '0.25em',
      },
      
      // Animations
      animation: {
        'fade-up':      'fadeUp 1.2s ease forwards',
        'fade-in':      'fadeIn 0.8s ease forwards',
        'drift':        'drift linear infinite',
        'shimmer':      'shimmer 3s linear infinite',
        'pulse-slow':   'pulse 4s ease-in-out infinite',
        'spin-slow':    'spin 20s linear infinite',
        'spin-reverse': 'spin 25s linear infinite reverse',
      },
      
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        drift: {
          '0%':   { transform: 'translateY(0) rotate(0deg)' },
          '100%': { transform: 'translateY(-100vh) rotate(360deg)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      
      // Backgrounds
      backgroundImage: {
        'gold-shimmer': 'linear-gradient(90deg, #9a7a4a, #c9a96e, #e8d5b0, #c9a96e, #9a7a4a)',
        'luxury-dark':  'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(201,169,110,0.12), transparent)',
        'gem-glow':     'radial-gradient(circle at center, rgba(201,169,110,0.15), transparent 70%)',
      },
      
      // Spacing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // Borders
      borderWidth: {
        '0.5': '0.5px',
      },
    },
  },
  plugins: [],
}
