import run from '@rollup/plugin-run';
import babel from 'rollup-plugin-babel';
import json from '@rollup/plugin-json';

const dev = process.env.NODE_ENV !== 'production';

export default {
  input: 'api/index.js',
  output: {
    file: 'bundle.js',
    format: 'cjs',
  },
  plugins: [
    babel({runtimeHelpers: true,
exclude: 'node_modules/**', // only transpile our source code
            presets: ["@babel/preset-env"],
            plugins: [
                "@babel/transform-runtime",
                "@babel/transform-regenerator",
                "@babel/transform-async-to-generator",
            ]}),
    json(),

    dev &&
      run({
        execArgv: ['-r', 'dotenv/config'],
      }),
  ],
};
