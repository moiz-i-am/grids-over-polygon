/**
 *
 * @param {*} center expects an object lat and lng
 * @param minMaxCoordinates expects an lat lng to calculate distance in km
 */
export const getMaxDistanceFromCenterInKm = async (
  center: {
    lat: number;
    lng: number;
  },
  minMaxCoordinates: {
    minLat: number;
    minLng: number;
    maxLat: number;
    maxLng: number;
  }
) => {
  const distanceArray = [];

  if (minMaxCoordinates.minLat) {
    const distance = await getDistanceFromLatLngInKm(
      center.lat,
      center.lng,
      minMaxCoordinates.minLat,
      center.lng
    );
    distanceArray.push(distance);
  }
  if (minMaxCoordinates.minLng) {
    const distance = await getDistanceFromLatLngInKm(
      center.lat,
      center.lng,
      center.lat,
      minMaxCoordinates.minLng
    );
    distanceArray.push(distance);
  }
  if (minMaxCoordinates.maxLat) {
    const distance = await getDistanceFromLatLngInKm(
      center.lat,
      center.lng,
      minMaxCoordinates.maxLat,
      center.lng
    );
    distanceArray.push(distance);
  }
  if (minMaxCoordinates.minLat) {
    const distance = await getDistanceFromLatLngInKm(
      center.lat,
      center.lng,
      center.lat,
      minMaxCoordinates.maxLng
    );
    distanceArray.push(distance);
  }

  const maxDistance = Math.max.apply(null, distanceArray);

  return maxDistance;
};

/**
 *
 * @param {*} center expects an object lat and lng
 * @param point expects an lat1 lng1 and lat2 lng2 to calculate distance in km
 */
const getDistanceFromLatLngInKm = async (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
) => {
  const earthRadiusKM: number = 6378.1; // Radius of the earth in km
  const dLat = degreeToRadian(lat2 - lat1); // deg2rad below
  const dLon = degreeToRadian(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreeToRadian(lat1)) *
      Math.cos(degreeToRadian(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = earthRadiusKM * c; // Distance in km
  return d;
};

/**
 *
 * @param {*} deg expects a degree number to convert into radian
 */
const degreeToRadian = (deg: number) => {
  return deg * (Math.PI / 180);
};
