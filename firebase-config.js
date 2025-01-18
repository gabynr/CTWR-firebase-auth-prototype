// firebase-config.js
export async function getFirebaseConfig() {
  const response = await fetch("/firebase-config.json");
  const config = await response.json();  // Parseamos el JSON
  return config;
}
