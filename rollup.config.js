import resolve from '@rollup/plugin-node-resolve';
import styles from "rollup-plugin-styles";
const autoprefixer = require('autoprefixer');
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import sourcemaps from 'rollup-plugin-sourcemaps';
import typescript from '@rollup/plugin-typescript';
// the entry point for the library

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


const inputs = [
    'index.js',
    'src/RevealTheme-beige.jsx',
    'src/RevealTheme-black.jsx',
    'src/RevealTheme-blood.jsx',
    'src/RevealTheme-league.jsx',
    'src/RevealTheme-moon.jsx',
    'src/RevealTheme-night.jsx',
    'src/RevealTheme-serif.jsx',
    'src/RevealTheme-simple.jsx',
    'src/RevealTheme-sky.jsx',
    'src/RevealTheme-solarized.jsx',
    'src/RevealTheme-white.jsx',
];

MODE.map((m) => {
    inputs.map(input => {
        var conf = {
            input: input,
            output: {
                // then name of your package
                name: "reveal-react",
                dir: 'dist/',
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
                typescript(),
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
                })
            ],
        }
        config.push(conf)

    });

})

export default [
  ...config,
]
