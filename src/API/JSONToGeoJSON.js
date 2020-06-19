export const toGeoJSON = (apiData) => {
  if (!apiData) return [];
  return apiData.map((info) => {
    return {
      // feature for Mapbox DC
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [info.AddressInfo.Longitude, info.AddressInfo.Latitude],
      },
      properties: {
        title: info.AddressInfo.Title,
        postcode: info.AddressInfo.Postcode,
      },
    };
  });
};
