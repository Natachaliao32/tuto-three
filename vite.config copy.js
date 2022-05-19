export default {
    build: {
        chunkSizeWarningLimit: 700,
        rollupOptions: {
            external: [
                "three",
                "three/examples/jsm/loaders/OBJLoader.js",
                "three/examples/jsm/controls/OrbitControls.js",
                "three/examples/jsm/loaders/TGALoader.js",
                "three/examples/jsm/loaders/FBXLoader.js"
            ]
        }
    },
    base: '/tuto-three/'
}