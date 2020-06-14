const openChargerAPI = "https://api.openchargemap.io/v3/poi/?output=json&";

export function fetchChargerLocations(latitude, longitude, distance) {
  const queryString = `coutrycode=GB&latitude=${latitude}&longitude=${longitude}&distance=${distance}`;
  return fetch(`${openChargerAPI}${queryString}`, { method: "GET" })
    .then((r) => r.json())
    .catch((error) => {
      console.error(error);
      return [];
    });
}
