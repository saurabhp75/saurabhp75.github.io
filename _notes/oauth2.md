---
layout: single
title: "OAuth2"
excerpt: "Intro to Oauth2"
---

1. The app redirects the user to login dialog of the provider(facebook) along with appid and appsecret and state(to prevevnt CSRF).

2. After the user logs in and give permissions, the provider redirects the user to app’s callback page.

3. The app, then sends an authorization request to provider and gets back the token(user?) for use in API calls.