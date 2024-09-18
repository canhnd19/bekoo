/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        hyperlink: 'var(--hyperlink)',
        active: 'var(--active)',
        border: 'var(--border)',
        borderSub: 'var(--border-sub)',
        backgroundPrimary: 'var(--background-primary)',
        increase: 'var(--amount-increase)',
        decrease: 'var(--amount-decrease)',
        success: 'var(--status-success)',
        warning: 'var(--status-warning)',
        complete: 'var(--status-complete)',
        error: 'var(--status-error)',
        failed: 'var(--status-failed)',
        pending: 'var(--status-pending)',
        processing: 'var(--status-processing)',
        placeholder: 'var(--placeholder)',
      },
      fontSize: {
        'landing-title': ['3rem', '4.5rem']
      }
    },
    container: {
      center: true,
    },
    screens: {
      'lg': {
        'max': '1023px'
      },
      'sm': {
        'max': '767px'
      },
      'xs': {
        'max': '374'
      },
    },


  },
  plugins: []
}