import {defineConfig} from "vite";
import path from "path";
import tsconfigPaths from 'vite-tsconfig-paths';
import compression from "vite-plugin-compression";


export default defineConfig({
    root: ".",
    build: {
        outDir: "build",
        sourcemap: true,
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true
            }
        },
        rollupOptions: {
            output: {
                format: 'es',
                entryFileNames: 'assets/[name]-[hash].js',
                chunkFileNames: 'assets/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash].[ext]'
            }
        },
        target: 'es2015',
        cssCodeSplit: true
    },
    server: {
        port: 3004,
        host: true,
        open: false,
    },
    base: "/",
    resolve: {
        extensions: [".js", ".ts", ".jsx", ".json"],
        alias: {
            '@elements': path.resolve(__dirname, './classes/elements'),
            '@classes': path.resolve(__dirname, './classes'),
            '@components': path.resolve(__dirname, './classes/components'),
            '@pages': path.resolve(__dirname, './pages'),
        }
    },
    plugins: [
        compression({
            algorithm: 'gzip',
            ext: '.gz'
        }), tsconfigPaths()
    ]
});
