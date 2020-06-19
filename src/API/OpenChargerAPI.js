export function fetchChargerLocations() {
  return fetch(
    `https://api.openchargemap.io/v3/poi/?output=json&coutrycode=GB`,
    { method: "GET" }
  )
    .then((r) => r.json())
    .catch((error) => {
      console.error(error);
      return [];
    });
}
