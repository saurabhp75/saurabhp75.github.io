---
title: "Geojson format"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["Geojson"]
draft: false
description: "Introduction to Geojson format"
---

**Geojson** file is a list of features having following format:

- type:
- geometry:
- Properties:

**Point** : list (size 2) of x/y coordinates.  
e.g.

```python
[30, 10]
```

**Linestring** : list of n points (2D array) of shape (n,1) where n is number of points in the line.
e.g.

```python
[
  [30, 10], [10, 30], [40, 40]
]
```

**Polygon** : list of size 1, which contains list of points (a size 2 list)
e.g.

```python
[
  [[30, 10], [40, 40], [20, 40], [10, 20], [30, 10]]
]
```

**Polygon(a polygon within a polygon)** :
e.g.

```python
[
  [[35, 10], [45, 45], [15, 40], [10, 20], [35, 10]],
  [[20, 30], [35, 35], [30, 20], [20, 30]]
]
```

**Multipolygon\*** :
e.g. TBD

### Structure of geojson file:

```json
{
  "type": "FeatureCollection",

  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [102.0, 0.5]
      },
      "properties": { "prop0": "value0" }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [102.0, 0.0],
          [103.0, 1.0],
          [104.0, 0.0],
          [105.0, 1.0]
        ]
      },
      "properties": { "prop0": "value0", "prop1": 0.0 }
    }
  ]
}
```

**geojson file\***: A collection of features, ie type = "FeatureCollection".

**features**: Must contain type, properties and geometry.

**Type**: It is generally "feature"

**Properties**: Could be things like country name, country code, state, etc.

**geometry**: Must contain a type (point, line, polygons, etc.) and coordinates (likely an array of lat-long).

### Convert shape file to geojson:

1. Upload dbf, shp, shx and prj file to https://mapshaper.org.
2. (Optional) Simplyfiy the file to reduce size. Click on 'Simplify' and select
   prevent shape removal also select weigted area (default). Then click apply.
3. Reduce the file size by using the slider on top. Also repair line intersections by clicking on repair in left.
4. Export the file to json and select 'don't remove shapes'.

### Basic workflow to get a geojson india map :

1. Download an Indian shapefile from meetup (github).
2. Simplify the shapefile (mapshaper.org) and export as geojson. When simplifying check the option "don't remove shapes". Also repair line intersections by clicking on repair in left.
3. Change the precision of exported geojson file using _geojson-precision_ npm package as shown below.

```shell
$ geojson-precision -p 2 input_geojson_file output_geojson_file
```

### Note:

1. This [link](http://geojson.io/#map=2/20.0/0.0) can be used to verify the geojson file.
