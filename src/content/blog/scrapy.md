---
title: "Scrapy"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["Scrapy"]
draft: false
description: "Introduction to Scrapy"
---

1. To start a new project

```shell
$ scrapy startproject projectname.
```

2. To create a simple spider within a project.
   domain: for eg. www.reddit.com/r/gameofthrones/.

```shell
$ scrapy genspider spydername domain
```

3. To generate a "crawler" within a project

```shell
$ scrapy genspider -t crawl crawlername domain (for eg. 	www.reddit.com/r/gameofthrones/).
```

4. To run a spider from scrapy shell

```shell
$ scrapy crawl netaproj -o items.json
$ scrapy crawl netaproj -t csv -o items.csv
```

5. To run scrapy shell

```shell
$ scrapy shell
```

6. To fetch and view a page from scrapy shell

```shell
$ fetch(‘url’)
$ view(response) # will open page in default browser
$ response.text # contains text of the response
```

**Note** : The response will be in `response` variable. One can use `response.css()` or `response.xpath()` to extract specific information.
