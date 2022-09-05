export const getPolygonCentroid = async (
  pts: {
    lat: number;
    lng: number;
  }[]
) => {
  const first = pts[0];
  const last = pts[pts.length - 1];

  if (first.lat !== last.lat || first.lng !== last.lng) pts.push(first);
  let twicearea = 0;
  let lat = 0;
  let lng = 0;
  const nPts = pts.length;
  let p1;
  let p2;
  let f;
  for (let i = 0, j = nPts - 1; i < nPts; j = i++) {
    p1 = pts[i];
    p2 = pts[j];
    f = p1.lat * p2.lng - p2.lat * p1.lng;
    twicearea += f;
    lat += (p1.lat + p2.lat) * f;
    lng += (p1.lng + p2.lng) * f;
  }
  f = twicearea * 3;
  return { lat: lat / f, lng: lng / f };
};

export const isInsidePolygon = async (
  polygon: {
    lat: number;
    lng: number;
  }[],
  grid: {
    lat: number;
    lng: number;
  }[]
) => {
  let point: {
    lat: number;
    lng: number;
  } = await getPolygonCentroid(grid);

  var i, j;
  var inside = false;
  for (i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    if (
      polygon[i].lng > point.lng != polygon[j].lng > point.lng &&
      point.lat <
        ((polygon[j].lat - polygon[i].lat) * (point.lng - polygon[i].lng)) /
          (polygon[j].lng - polygon[i].lng) +
          polygon[i].lat
    )
      inside = !inside;
  }
  return inside;
};
