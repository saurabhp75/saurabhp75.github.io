---
title: "Maps Processing"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["Maps"]
draft: true
description: "Introduction to Maps Processing"
---

### Scraping the data (folder name: neta_scraper):

Run following command from project folder(neta_scraper) to get lok sabha data:

```shell
$ scrapy crawl lsbot -t csv -o lsabha.csv
```

Run following command from project folder(neta_scraper) to get assembly data:

```shell
$ scrapy crawl netabot -t csv -o mla.csv
```

### Cleaning the data (folder name: neta_cleaner):

- Using script to clean data : `clean_data.py`. Use following Python script to clean data. Here `lsabha.csv` is raw Lok Sabha data and `mla.csv`is raw Assembly data. Cleaned data will be in files `ls_cleaned_data.csv`and `mla_cleaned_data.csv` respectively.

```shell
$ python clean_data.py lsabha.csv mla.csv
```

- Ipython notebook to clean data : `neta_cleaner.ipynb`

### Analyzing the data (folder name: neta_analysis):

- Ipython notebook to analyze the data : `neta_analysis.ipynb`

### Visualizing the data using geopandas (folder name: neta_geopandas_visual):

- Ipython notebook to visualize state data on map : `neta_state_mapviz.ipynb`
- Ipython notebook to visualize PC data on map : `neta_pc_mapviz.ipynb`

**Note** : Check for compatibility of geojson file on : http://geojson.io/#map=2/20.0/0.0

### Convert and simplify shape file to geojson or other format:

1. Upload dbf, shp, shx and prj file to _https://mapshaper.org_.
2. (Optional) Simplyfy the file to reduce size. Click on `Simplify` and select `Prevent shape removal` also select weigted area (default). Then click apply.
3. Reduce the file size by using the slider on top. Also repair line intersections by clicking on `repair` in left.
4. Export the file to json and select `don't remove shapes`.
