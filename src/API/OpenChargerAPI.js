export function fetchChargerLocations(latitude, longitude) {
  const queryString = `https://api.openchargemap.io/v3/poi/?output=json&distance=100&latitude=${latitude}&longitude=${longitude}`;
  return fetch(`${queryString}`, { method: "GET" })
    .then((r) => r.json())
    .catch((error) => {
      console.error(error);
      return [];
    });
}
