export default {
    build: {
        chunkSizeWarningLimit: 700,
        rollupOptions: {
            external: [
                /node_modules/
            ]
        }
    },
    base: '/tuto-three/'
}