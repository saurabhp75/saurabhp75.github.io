---
title: "OAuth2"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["OAuth2"]
draft: false
description: "Introduction to OAuth2"
---

### Enterprise authentication solution

`SAML protocol`: Single sign on(SSO) across sites.

### Legacy authentication solution

`Simple login`: Forms and cookes.

### What problem does Oauth2 address

- Delegated authorization problem.

### Oauth2 flow

- Click on login with Gmail.
- Redirected to accounts.google.com and prompted to login.
- After logging in, prompt the user if they want to share public profile and contacts with Yelp?
- If user clicks Yes, then he is redirected back to application, at a specific place called 'redirect uri'.

### Oauth2 terminology

- `Resource owner`: The user clicking yes at prompt.
- `Client`: The application for eg. Yelp.
- `Authorization server`: System which user uses to say Yes, for eg. accounts.google.com
- `Resource server`: The API or resources which the client want access to. For eg Google contacts API.
- `Authorization grant`: Proves that resource owner/user has clicked yes.
- `Redirect Uri/callback`: Auth flow goes here when "user" clicks yes.
- `Access token`: Used by client to get access to resource server.
- `Scope`: Authorization server has a list of scopes for eg contact-read, contact-write, profile-read etc.
- `Consent`:

### Network security terminology:

- `Back channel`: Highly secure channel, for eg. from a backend server to resource server. The secret key/application id/ access token is never known to and sent from the front channel.
- `Front channel`: Less secure channel, for eg. browser. We cannot put a key in html or javascript of the web app as anyone can view the source. It is used to interact with the user or resource owner.

## Oauth2 Flows

![Oauth2 Flows](/static/images/oauth2/oauth2_flows.jpg)

## Oauth2 authorization code Flow

![Oauth2 code Flow](/static/images/oauth2/oauth_code_flow.jpeg)

## Note

- `state` is used to prevent CSRF.
- The client registers with authorization server and gets `client ID` and `client secret` which are later used in front and back channel communication respectively. It also has to specify `redirect URI/Callback`.

## Starting the Oauth2 authorization code flow

![Starting the flow](/static/images/oauth2/starting_flow.jpg)

## Calling back

![Starting the flow](/static/images/oauth2/starting_flow.jpg)

## Exchange the code for access token

![Exchange code for token](/static/images/oauth2/xchange_code_for_token.jpg)

## Access token from server

![Exchange code for token](/static/images/oauth2/access_token.jpg)

## Use the access token

![Exchange code for token](/static/images/oauth2/use_token.jpg)

## Identity use cases Pre 2014

![Identity use cases Pre 2014](/static/images/oauth2/use_cases_pre2014.jpg)

## Problems with Oauth2 Authentication

- Oauth2 was primarily designed for authorization. As there is no standard way of getting user's information.
- No standard way to get user's information.
- Every implementation is little different.
- No common set of scopes.

## What OpenID connect adds

- ID token.
- UsertInfo endpoint for getting more user information.
- Standard set of scopes.
- Standardized implementation.

## Identity use cases today (with openID)

![Identity use cases today](/static/images/oauth2/identity_use_cases_today.jpg)

## OpenID stack

![OpenID stack](/static/images/oauth2/http_oauth2_openid.jpeg)

## Oauth2 vs OpenID

![Oauth2 with OpenID](/static/images/oauth2/oauth2_openid.jpg)

## OpenID connect authorization code flow

![openID flow](/static/images/oauth2/openid_flow.jpg)

## Starting OIDC flow

![Starting OIDC](/static/images/oauth2/starting_oidc.jpg)

## Exchange code for access token and ID token

![Starting OIDC](/static/images/oauth2/code_for_tokenid.jpg)

## Auth server returns access and ID tokens

![Return token and ID](/static/images/oauth2/tokenid_return.jpg)

## ID token (aka JWT) in OpenID

![The ID token](/static/images/oauth2/jwt_structure.jpg)

## ID token in code/json

![ID token in code/json](/static/images/oauth2/id_token_jwt.jpg)

## ID Token(JWT) in debugger

![ID TOken(JWT) in debugger](/static/images/oauth2/jwt_structure1.jpg)

## Calling user info endpoint

![Calling user info endpoint](/static/images/oauth2/user_info_endpoint.jpg)

## Oauth2 Implicit flow

![Oauth2 Implicit flow](/static/images/oauth2/implicit_flow_detailed.jpg)

## Which authorization grant type (flow) to use

![Authorization grant types](/static/images/oauth2/grant_types.jpg)

## Server flow example

![Server flow example](/static/images/oauth2/server_flow_example.jpeg)

## Mobile flow example

![Mobile flow example](/static/images/oauth2/mobile_flow_example.jpg)

## Authorization code with PKCE part1

![Authorization code with PKCE part1](/static/images/oauth2/authcode_with_pkce1.jpg)

## Authorization code with PKCE part2

![Authorization code with PKCE part2](/static/images/oauth2/authcode_with_pkce2.jpg)

## Implicit Flow example

![Implicit Flow example](/static/images/oauth2/implicit_flow_example.jpg)

## Oauth discovery

![Oauth discovery](/static/images/oauth2/oauth_discovery.jpg)

### Third party(SAML) integration example

![Third party integration example](/static/images/oauth2/sso_third_party.jpg)

## Token validation

- `Local validation`: The fast way.
  - Check expiration timestamp.
  - Validate cryptographic signature.
- `Introspection`: The strong way.

## Keeping user signed in

For both local validation and introspection, the token is invalid once it expires

- If there is user at keyboard, just redirect him to authorization server.
- If there is no user(automated tasks), request a refresh token(offline scope).

**Note:** Using `okta` you can spin your own authorization server in the cloud.
