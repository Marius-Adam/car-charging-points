const openChargerAPI =
  "https://api.openchargemap.io/v3/poi/?output=json&countrycode=GB&maxresults=100&compact=true&verbose=false";

export function fetchChargerLocations() {
  return fetch(`${openChargerAPI}`, { method: "GET" })
    .then((r) => r.json())
    .catch((error) => {
      console.error(error);
      return [];
    });
}
