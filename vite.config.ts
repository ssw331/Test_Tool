/// <reference types="vitest" />
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    test: {
        reporters: ['html', 'json'],
        outputFile: {
            json: 'js-report-0.0.1.json'
        },
        coverage: {
            reporter: ['html']
        }
    }
})
