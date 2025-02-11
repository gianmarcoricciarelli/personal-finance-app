import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), svgr(), tailwindcss()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@components': path.resolve(__dirname, './src/components'),
            '@contexts': path.resolve(__dirname, './src/contexts'),
            '@data': path.resolve(__dirname, './src/assets/data'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@icons': path.resolve(__dirname, './src/assets/images'),
            '@pages': path.resolve(__dirname, './src/pages')
        }
    }
})
