const BASE_URL = "https://www.dnd5eapi.co/api/2014";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Error: ${res.status}`);
}

export function getClasses() {
  return fetch(`${BASE_URL}/classes`)
    .then(checkResponse)
    .catch((err) => {
      console.error("Failed to fetch classes:", err);
      throw err;
    });
}

export function getSpells() {
  return fetch(`${BASE_URL}/spells`)
    .then(checkResponse)
    .catch((err) => {
      console.error("Failed to fetch spells:", err);
      throw err;
    });
}
