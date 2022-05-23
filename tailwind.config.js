module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  safelist: [
    { pattern: /col-start-\d/ },
  ],
  plugins: [
    // eslint-disable-next-line global-require,import/no-extraneous-dependencies
    require('@tailwindcss/forms'),
  ],
};
