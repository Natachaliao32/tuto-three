import { generateRandomPosition } from "./../utils.js";
import * as THREE from "three";

export default class Stars {

  model; // On mettra dedans l'objet 3D représentant le groupe d'étoiles

  constructor(n) {

    // Crée un groupe auquel on ajoutera les objets 3D
    const stars = new THREE.Group();

    // Crée un matériel et une géométrie commune pour toutes les étoiles
    const material = new THREE.MeshStandardMaterial({ color: 0xf7f386 });
    const geometry = new THREE.SphereGeometry(.05);

    // Crée n étoiles à des positions aléatoires et les ajoute au groupe
    for (let i = 0; i < n; i++) {
      let { x, y, z } = generateRandomPosition(-6, 6, -3, 3, -10, 10);
      const star = new THREE.Mesh(geometry, material);
      star.position.set(x, y, z);
      stars.add(star);
    }

    this.model = stars;
  }
}