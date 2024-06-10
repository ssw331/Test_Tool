/// <reference types="vitest" />
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    test: {
        reporters: ['html', 'json'],
        outputFile: {
            json: 'js-report.json'
        },
        coverage: {
            reporter: ['html']
        }
    }
})
