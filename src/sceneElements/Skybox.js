import * as THREE from "three";

export default class Skybox {

  model; // On mettra dedans l'objet 3D représentant la skybox

  constructor() {

    // Pour créer un cube de taille 10

    const geometry = new THREE.BoxGeometry(10, 10, 10);

    // Créer un tableau de 6 matériaux, une pour chaque face

    const textureLoader = new THREE.TextureLoader();
    const materials = [
      new THREE.MeshBasicMaterial({ // Face avant
        map: textureLoader.load("/src/assets/skybox/space_ft.png"),
      }),
      new THREE.MeshBasicMaterial({ // Face arrière
        map: textureLoader.load("/src/assets/skybox/space_bk.png"),
      }),
      new THREE.MeshBasicMaterial({ // Face du haut
        map: textureLoader.load("/src/assets/skybox/space_up.png"),
      }),
      new THREE.MeshBasicMaterial({ // Face du bas
        map: textureLoader.load("/src/assets/skybox/space_dn.png"),
      }),
      new THREE.MeshBasicMaterial({ // Face droite
        map: textureLoader.load("/src/assets/skybox/space_rt.png"),
      }),
      new THREE.MeshBasicMaterial({ // Face gauche
        map: textureLoader.load("/src/assets/skybox/space_lf.png"),
      }),
    ];

    // Afficher l'intérieur plutôt que l'extérieur des faces

    materials.forEach( material => {
      material.side = THREE.BackSide;
    })

    this.model = new THREE.Mesh(geometry, materials);
  }
}