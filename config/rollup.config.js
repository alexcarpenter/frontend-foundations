const compiler = require('@ampproject/rollup-plugin-closure-compiler');

module.exports = {
  input: '_src/assets/scripts/app.js',
  output: {
    file: 'www/assets/scripts/bundle.js',
    format: 'iife',
  },
  plugins: [
    compiler(),
  ]
};
