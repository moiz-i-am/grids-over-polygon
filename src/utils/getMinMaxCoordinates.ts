/**
 *
 * @param {*} coordinates expects an array of lat and lng arrays
 */
export const getMinMaxCoordinates = async (
  coordinates: {
    lat: number;
    lng: number;
  }[]
) => {
  const lat = coordinates.map(p => p.lat);
  const lng = coordinates.map(p => p.lng);

  const minMaxcoordinates = {
    minLat: Math.min.apply(null, lat),
    minLng: Math.min.apply(null, lng),
    maxLat: Math.max.apply(null, lat),
    maxLng: Math.max.apply(null, lng),
  };

  return minMaxcoordinates;
};
