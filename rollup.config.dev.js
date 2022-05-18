import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import scss from 'rollup-plugin-scss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import postcss from 'postcss'
import ignoreImport from 'rollup-plugin-ignore-import'
import ts from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'

const fs = require('fs');

export const getFiles = (entry, extensions = [], excludeExtensions = []) => {
  let fileNames = [];
  const dirs = fs.readdirSync(entry);

  dirs.forEach((dir) => {
    const path = `${entry}/${dir}`;

    if (fs.lstatSync(path).isDirectory()) {
      fileNames = [
        ...fileNames,
        ...getFiles(path, extensions, excludeExtensions),
      ];

      return;
    }

    if (!excludeExtensions.some((exclude) => dir.endsWith(exclude))
      && extensions.some((ext) => dir.endsWith(ext))
    ) {
      fileNames.push(path);
    }
  });

  return fileNames;
};


const packageJson = require('./package.json')

const extensions = ['.tsx'];

const generateLibrary = {
  input: [
    ...getFiles('./src/components', extensions)
  ],
  output: [
    {
      // file: packageJson.main,
      dir: 'dist',
      preserveModules: true,
      preserveModulesRoot: 'src',
      format: 'cjs',
      sourcemap: true,
      exports: 'auto'
    },
    {
      // file: packageJson.module,
      dir: 'dist',
      preserveModules: true,
      preserveModulesRoot: 'src',
      format: 'esm',
      sourcemap: true,
      exports: 'auto'
    },
  ],
  plugins: [
    peerDepsExternal(),
    ts({ tsconfig: './tsconfig.json' }),
    scss({
      sourceMap: true,
      // prefix: `@use "sass:math";@import "./src/styles/globals.scss";`,
      processor: () => postcss([
        autoprefixer(),
        cssnano({ preset: 'default' }),
      ]),
    }),
  ],
}
const generateTypings = {
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.mainTypes,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.moduleTypes,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    ignoreImport({
      extensions: ['.scss', '.css'],
    }),
    dts(),
  ],
}


export default [
  generateLibrary,
  // generateTypings,
]
