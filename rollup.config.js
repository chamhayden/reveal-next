import resolve from '@rollup/plugin-node-resolve';
import styles from "rollup-plugin-styles";
const autoprefixer = require('autoprefixer');
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import sourcemaps from 'rollup-plugin-sourcemaps';
import typescript from '@rollup/plugin-typescript';

// the entry point for the library
const input = 'index.ts'

// 
var MODE = [
  {
    fomart: 'cjs'
  },
  {
    fomart: 'esm'
  },
  {
    fomart: 'umd'
  }
]




var config = []


MODE.map((m) => {
    var conf = {
        input: input,
        output: {
            // then name of your package
            name: "reveal-next",
            dir: `dist/`,
            format: m.fomart,
            exports: "auto",
            sourcemap: true,
            inlineDynamicImports: true,
        },
        // this externelizes react to prevent rollup from compiling it
        external: [
            "react",
            "next/dynamic",
            "reveal.js",
            "reveal.js/plugin/notes/notes",
            "reveal.js/plugin/highlight/highlight",
            /@babel\/runtime/
        ],
        plugins: [
            resolve(),
            // these are babel comfigurations
            babel({
                exclude: ['node_modules/**'],
                plugins: ['@babel/transform-runtime'],
                babelHelpers: 'runtime'
            }),
            // this adds sourcemaps
            commonjs(),
            sourcemaps(),
            // this adds support for styles
            styles({
                postcss: {
                    plugins: [
                        autoprefixer()
                    ]
                }
            }),
            typescript(),
        ],
    }
    config.push(conf)
})

export default [
  ...config,
]
