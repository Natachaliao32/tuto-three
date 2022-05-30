import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { revolve } from "./../utils.js";

export default class Ufo {

  model; // On mettra dedans l'objet 3D représentant la soucoupe

  // Charge de façon asynchrone le modèle et le passe à this.model
  async load() {
    return new Promise((resolve, reject) => {

      // Après que le modèle soit chargé
      const onLoad = (obj) => {
        // Le modèle est trop grand, on réduit sa taille
        obj.scale.multiplyScalar(0.01);
        this.model = obj;
        resolve();
      };

      // Pendant que le modèle charge
      const onProgress = undefined;

      // Si une erreur se produit
      const onError = (error) => {
        reject(error);
      };
      
      new FBXLoader().load(
        "/src/assets/UFO/Low_poly_UFO.FBX",
        onLoad,
        onProgress,
        onError
      );
    });
  }
  
  update() {
    if(!this.model) return 
    
    const time = Date.now() * 0.0005;

    // Donne à l'objet sa nouvelle position
    const { x, y, z } = revolve(time, 0, 0, 0, 2);
    this.model.position.set(x, y, z);

    // Tourne l'objet vers le centre de la planète
    this.model.lookAt(0, 0, 0);

    // La tranche de la soucoupe est orientée vers la planète
    // Nous voudrions plutôt que ce soit le bas de la soucoupe
    // Tournons la soucoupe sur elle-même pour que ce soit le cas
    this.model.rotateY(Math.PI / 2);
    this.model.rotateZ(-Math.PI / 2);
  }
}