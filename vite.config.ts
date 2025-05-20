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
            '@components': path.resolve(__dirname, './OComponents'),
            '@classes': path.resolve(__dirname, './classes'),
            '@dcomponents': path.resolve(__dirname, './classes/dcomponents'),
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
