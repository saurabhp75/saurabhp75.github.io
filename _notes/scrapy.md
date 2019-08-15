---
layout: single
title: "Scrapy Notes"
excerpt: "Intro to Scrapy"

sidebar:
  - title: "Scrapy personal notes"
    text: "Python 3.x, Django 2.x, PythonAnywhere.com"
---

Scrapy

    1. To start a new project :
	$ scrapy startproject projectname.

    2. To create a simple spider within a project :
	$ scrapy genspider spydername domain (for eg. 	www.reddit.com/r/gameofthrones/).

    3. To generate a "crawler" within a project :
	$ scrapy genspider -t crawl crawlername domain (for eg. 	www.reddit.com/r/gameofthrones/).

    4. To run a spider from scrapy shell :
	$ scrapy crawl netaproj -o items.json
	$ scrapy crawl netaproj -t csv -o items.csv

    5. To run scrapy shell :
	$ scrapy shell

    6. To fetch and view a page from scrapy shell :
	$ fetch(‘url’)

	# Note : The response will be in “response” variable. One can use 	   	response.css() or response.xpath() to extract specific information.

	$ view(response) # will open page in default browser
	response.text # contains text of the response