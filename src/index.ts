import { Polygon } from './utils/Entities/polygon.entity';
import { getPolygonCentroid } from './utils/getPolygonCentroid';
import { getMinMaxCoordinates } from './utils/getMinMaxCoordinates';
import { getLeftBottomPoint, getPointFromPoint } from './utils/getPoints';
import { getMaxDistanceFromCenterInKm } from './utils/getMaxDistanceFromCenterInKm';

/**
 *
 * @param {*} polygon expects an array of latitude longitude arrays
 * @param gridSizeInKM expects size of grid to be created in kilometers
 */
export const createGrids = async (polygon: Polygon, gridSizeInKM: number) => {
  const angle0Degrees: number = 0;
  const angle90Degrees: number = 90;

  const ucPolygonGeom = polygon?.coordinates;

  const ucLatLngs = ucPolygonGeom?.map(coordinates => {
    const latLng = coordinates?.map(coordinate => ({
      lat: coordinate[1],
      lng: coordinate[0],
    }));
    return latLng;
  })[0];

  const polygon_center = await getPolygonCentroid(ucLatLngs);
  const minMaxCoordinates = await getMinMaxCoordinates(ucLatLngs);

  const maxDistanceFromCenterInKm = await getMaxDistanceFromCenterInKm(
    polygon_center,
    minMaxCoordinates
  );

  const centerPointObj = polygon_center;
  const numberOfGridsOverPolygon =
    (maxDistanceFromCenterInKm / gridSizeInKM) * 2;

  // Calulcating left bottom most point. for starting the grid.
  let ref1 = getLeftBottomPoint(centerPointObj, maxDistanceFromCenterInKm);
  let ref2 = getPointFromPoint(ref1, gridSizeInKM, angle90Degrees);

  let refx;
  let refy;

  const squareStack = [];
  for (let ix = 0; ix < Math.floor(numberOfGridsOverPolygon); ix++) {
    refx = ref1;
    refy = ref2;
    for (let iy = 0; iy < Math.floor(numberOfGridsOverPolygon); iy++) {
      const ref3 = getPointFromPoint(refx, gridSizeInKM, angle0Degrees);
      const ref4 = getPointFromPoint(refy, gridSizeInKM, angle0Degrees);

      const refxArr = [refx.lng, refx.lat];
      const refyArr = [refy.lng, refy.lat];
      const ref3Arr = [ref3.lng, ref3.lat];
      const ref4Arr = [ref4.lng, ref4.lat];

      const grid = [refxArr, refyArr, ref4Arr, ref3Arr, refxArr];

      const polygon_structure = {
        type: 'Polygon',
        coordinates: [grid],
      };

      squareStack.push({
        polygon: { ...polygon_structure },
      });

      refx = ref3;
      refy = ref4;
    }
    // When the horizontal loop is finished goto above loop.
    ref1 = ref2;
    ref2 = getPointFromPoint(ref1, gridSizeInKM, angle90Degrees);
  }

  return squareStack;
};
