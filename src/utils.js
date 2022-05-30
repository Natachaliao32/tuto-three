// Calcule à un temps donné les coordonnées d'un point qui tourne autour d'un cercle de centre (cx, cy, cz) et de rayon r
export function revolve(time, cx, cy, cz, r) {
  const x = cx + Math.cos(time) * r;
  const y = cy + Math.sin(time) * r;
  const z = cz + Math.cos(time) * r;
  return { x, y, z };
}

// Génère des positions aléatoires dans un espace délimité
export function generateRandomPosition(xmin, xmax, ymin, ymax, zmin, zmax) {
  const x = Math.random() * (xmax - xmin) + xmin;
  const y = Math.random() * (ymax - ymin) + ymin;
  const z = Math.random() * (zmax - zmin) + zmin;
  return { x, y, z };
}

export function onWindowResize(renderer, camera) {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;

  // Méthode à appeler à chaque fois qu'un paramètre de la caméra est modifié
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
}
