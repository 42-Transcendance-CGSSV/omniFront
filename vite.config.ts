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
    },
    server: {
        port: 3004,
        host: true,
        open: false,
    },
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
            algorithm: 'brotliCompress',
            ext: '.br'
        }), tsconfigPaths()
    ]
});
