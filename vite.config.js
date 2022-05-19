import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        commonjsOptions: {
          include: [/node_modules/]
        }
    },
    base: '/tuto-three/'
})