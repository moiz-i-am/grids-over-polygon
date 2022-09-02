# Grids Over Polygon

## Table of Contents

- [Features](#features)
- [Installing](#installing)
- [Size Scale](#size-scale)
- [Example](#example)
- [License](#license)

## Features

- Make grid polygons over a polygon having closed line rings
- Make grid polygons by giving size in square kilometers

## Installing

Using npm:

```bash
$ npm install grids-over-polygon
```

Using yarn:

```bash
$ yarn add grids-over-polygon
```

## Size Scale

- 0.010 -> 10 sqmeters
- 0.020 -> 20 sqmeters
- 0.030 -> 30 sqmeters
- 0.040 -> 40 sqmeters
- 0.050 -> 50 sqmeters
- ...
- ...
- 0.1 -> 100 sqmeters
- 0.2 -> 200 sqmeters
- ...
- ...

## Example

### smaple input polygon

In order to gain grid polygons your polygon must be in a closed line-ring format like:

```js
let polygon = {
  type: 'Polygon',
  coordinates: [
    [
      [68.512042621, 25.3242867300001],
      [68.5112976780001, 25.3242098640001],
      [68.510249592, 25.3238493880002],
      [68.5093489910001, 25.32398536500011],
      [68.5089150000001, 25.3237670000001],
      [68.5088307380001, 25.3234603970002],
      [68.5070500000002, 25.322573],
      [68.5074308300001, 25.3222267860002],
      [68.507042148, 25.3216887290001],
      [68.506972433, 25.321487729],
      [68.5069487710001, 25.3211973530002],
      [68.5068385850002, 25.320900226],
      [68.5062476370001, 25.3200674550001],
      [68.5061603980001, 25.3198325710001],
      [68.505565, 25.3172970000001],
      [68.5036411620001, 25.3101630540002],
      [68.499214034, 25.3078994810002],
      [68.4986290000001, 25.3081460000001],
      [68.4970450000001, 25.3071580000002],
      [68.49534786, 25.305435619],
      [68.4949080930002, 25.3045316550001],
      [68.4920286710001, 25.3039871830001],
      [68.490853874, 25.304612589],
      [68.4904316530001, 25.3053757910001],
      [68.487973048, 25.3047899310001],
      [68.4874530060002, 25.304597969],
      [68.486944394, 25.3047813230001],
      [68.512042621, 25.3242867300001],
    ],
  ],
};
```

### Usage

```js
const { createGrids } = require('grids-over-polygon');
```

```js
const {createGrids} = require('grids-over-polygon');

const yourPolygon = [...];
const yourSizeInKilometers = 0.1; // for grid size in square kilometers/meters

let output = createGrids(yourPolygon, yourSizeInKilometers);
```

### Sample Output Structure

```json
[
  {
    "polygon": {
      "type": "Polygon",
      "coordinates": [
        [
          [68.45690698868681, 25.180706117700627],
          [68.4578996405087, 25.1807061143897],
          [68.4578996405087, 25.181604434885035],
          [68.45690698868681, 25.181604438195958],
          [68.45690698868681, 25.180706117700627]
        ]
      ]
    }
  }
]
```

## License

[MIT](LICENSE)
