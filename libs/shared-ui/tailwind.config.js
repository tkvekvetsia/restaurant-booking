const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');
const defaultTailwindConfig = require('@nx/angular/tailwind');
const sharedTailwindConfig = require('../tailwind-preset/tailwind.config');
console.log(sharedTailwindConfig);
/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [sharedTailwindConfig],
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  ...defaultTailwindConfig,
};
