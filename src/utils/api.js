const BASE_URL = "https://www.dnd5eapi.co/api/2014";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Error: ${res.status}`);
}

export function getRaces() {
  return fetch(`${BASE_URL}/races`)
    .then(checkResponse)
    .catch((err) => {
      console.error("Failed to fetch races:", err);
      throw err;
    });
}

export function getClasses() {
  return fetch(`${BASE_URL}/classes`)
    .then(checkResponse)
    .catch((err) => {
      console.error("Failed to fetch classes:", err);
      throw err;
    });
}

export function getBackgrounds() {
  return fetch(`${BASE_URL}/backgrounds`)
    .then(checkResponse)
    .catch((err) => {
      console.error("Failed to fetch backgrounds:", err);
      throw err;
    });
}

export function getSpells() {
  return fetch("http://localhost:3001/api/spells")
    .then(checkResponse)
    .then((response) => response.data)
    .catch((err) => {
      console.error("Failed to fetch spells:", err);
      throw err;
    });
}

export function getSpellDetails(spellId) {
  return fetch(`http://localhost:3001/api/spells/${spellId}`)
    .then(checkResponse)
    .then((response) => response.data)
    .catch((err) => {
      console.error(`Failed to fetch spell details for ID ${spellId}:`, err);
      throw err;
    });
}

export function getResourceDetails(url) {
  return fetch(`https://www.dnd5eapi.co${url}`)
    .then(checkResponse)
    .catch((err) => {
      console.error("Failed to fetch resource details:", err);
      throw err;
    });
}
