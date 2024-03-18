import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  build: {
    minify: false,
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'react-altdraw',
      fileName: 'index',
    },
    rollupOptions: {
      treeshake: 'smallest',
      external: ['react'],
      output: {
        globals: {
          react: 'React',
        },
      },
    },
  },
  plugins: [
    eslint(),
    dts({
      insertTypesEntry: true,
    }),
  ],
});