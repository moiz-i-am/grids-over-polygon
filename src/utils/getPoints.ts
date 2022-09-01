/**
 *
 * @param {*} center expects an object lat and lng
 */
export const getLeftBottomPoint = (
  center: {
    lat: number;
    lng: number;
  },
  distanceInKm: number
) => {
  const point = getPointFromPoint(center, distanceInKm, 270);
  const leftBottomPoint = getPointFromPoint(point, distanceInKm, 180);

  return leftBottomPoint;
};

/**
 *
 * @param {*} center expects an object of lat and lang
 * @param distance expects distance in km.
 */
export const getPointFromPoint = (
  center: {
    lat: number;
    lng: number;
  },
  distance: number,
  bearing: number
) => {
  const R = 6378.1; // Radius of the Earth
  const brng = (Math.PI * bearing) / 180; // Bearing is 90 degrees converted to radians.
  const d = distance; // Distance in km

  let lat2; // 52.20444 - the lat result I'm hoping for
  let lon2; // 0.36056 - the long result I'm hoping for.

  const lat1 = (Math.PI * center.lat) / 180; // Current lat point converted to radians
  const lon1 = (Math.PI * center.lng) / 180; // Current long point converted to radians

  lat2 = Math.asin(
    Math.sin(lat1) * Math.cos(d / R) +
      Math.cos(lat1) * Math.sin(d / R) * Math.cos(brng)
  );

  lon2 =
    lon1 +
    Math.atan2(
      Math.sin(brng) * Math.sin(d / R) * Math.cos(lat1),
      Math.cos(d / R) - Math.sin(lat1) * Math.sin(lat2)
    );

  lat2 *= 180 / Math.PI;
  lon2 *= 180 / Math.PI;

  return { lat: lat2, lng: lon2 };
};
