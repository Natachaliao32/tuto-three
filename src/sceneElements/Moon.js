import * as THREE from "three";

export default class Moon {
  model; // On mettra dedans l'objet 3D représentant la lune

  constructor() {
    // Charge les textures
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("/src/assets/plutomap1k.jpg");
    const bump = textureLoader.load("/src/assets/plutobump1k.jpg");

    // Créer le matériau
    const material = new THREE.MeshStandardMaterial({
      map: texture, // (Texture) Texture de base
      bumpMap: bump, // (Texture) Bump map
      bumpScale: 0.05, // (Float) Influence de la bump map sur le matériau
    });

    const geometry = new THREE.SphereGeometry();
    this.model = new THREE.Mesh(geometry, material);
  }

  update() {
    this.model.rotation.x += 0.001;
    this.model.rotation.y -= 0.001;
  }
}
