import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    port: 3000,
    open: true
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json']
  }
}); 