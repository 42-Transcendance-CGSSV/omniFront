import {defineConfig} from "vite";
import path from "path";
import tsconfigPaths from 'vite-tsconfig-paths';
import compression from "vite-plugin-compression";


export default defineConfig({
    root: ".",
    build: {
        outDir: "dist",
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
        extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
        alias: {
            '@components': path.resolve(__dirname, './OComponents'),
            '@classes': path.resolve(__dirname, './core/Classes'),
        }
    },
    plugins: [
        compression({
            algorithm: 'brotliCompress',
            ext: '.br'
        }), tsconfigPaths()
    ]
});
