---
title: "Python request"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["Python", "Request"]
draft: false
description: "Introduction to Python request"
---

### Python requests

```shell
Simple GET request
>>> import requests
>>> r = requests.get('http://google.com')

Pass the parameters in GET URLs (Passed in query string eg. httpbin.org/get?key=val)
>>> parameters = {'key1': 'value1', 'key2': 'value2'}
>>> r = requests.get('https://httpbin.org/get', params=parameters)
>>> print(r.url)
https://httpbin.org/get?key1=value1&key2=value2

Simple POST request
>>> r = requests.post('https://httpbin.org/post', data = {'key':'value'})

Simple PUT request (Not allowed 405)
>>> r = requests.put('https://httpbin.org/put', data = {'key':'value'})

Simple DELETE request
>>> r = requests.delete('https://httpbin.org/delete')

Simple HEAD request
>>> r = requests.head('https://httpbin.org/get')

Simple OPTIONS request
>>> r = requests.options('https://httpbin.org/get')

Logging in using credentials
>>> r = requests.get('https://api.github.com/user', auth=('myemailid. mail.com', 'password'))
>>> r.status_code
200
>>> r.url
u'https://api.github.com/user'
>>> r.request
<PreparedRequest [GET]>
```

### r.content vs r.text vs r.encoding

- r.content : raw data (bytes, no meaning)
- r.text : when r.encoding is applied to r.content (meaning/code point applied to a chunk of byte(s))
- r.encoding : Encoding to be applied to r.content to get r.text.

**Note** : Unicode is 4 bytes encoding.

```shell
# raw content
>>> r.content
# return a string as per ‘r.encoding’
# ‘r.apparent_encoding’ is used if ‘r.encoding’ is None
>>> r.text
>>> r.encoding
‘utf-8’
>>> r.apparent_encoding
‘ascii’

```
