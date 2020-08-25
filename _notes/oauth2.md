---
layout: single
title: "OAuth2"
excerpt: "Intro to Oauth2"
---

### Enterprise authentication solution
SAML protocol: Single sign on(SSO) across sites.

### Legacy authentication solution
Simple login: Forms and cookes.

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
- `Front channel`: Less secure channel, for eg. browser. We cannot put a key in html or is of the web app as anyone can view the source. It is used to interact with the user or resource owner.

## Authorization grant types
![Authorization grant types](/assets/images/oauth2/grant_types.jpg)

## Callabck step
![Callabck step](/assets/images/oauth2/callback_step.jpg)

## Identitiy use cases Pre 2014
![Identitiy use cases Pre 2014](/assets/images/oauth2/use_cases_pre2014.jpg)

## Identitiy use cases today (with openID)
![Identitiy use cases today](/assets/images/oauth2/identity_use_cases_today.jpg)

## Oauth2 Flows
![Oauth2 Flows](/assets/images/oauth2/oauth2_flows.jpg)

## Oauth2 code Flow
![Oauth2 code Flow](/assets/images/oauth2/oauth_code_flow.jpeg)

## Note
- `state` is used to prevevnt CSRF.
- The client registers with authorization server and gets `client ID` and `client secret` which are later used in front and back channel communication respectively. It also has to specify `redirect URI/Callback`.

## Oauth2 Implicit flow
![Oauth2 Implicit flow](/assets/images/oauth2/implicit_flow_detailed.jpg)

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

## OpenID stack
![OpenID stack](/assets/images/oauth2/http_oauth2_openid.jpeg)

## Oauth2 vs OpenID
![Oauth2 with OpenID](/assets/images/oauth2/oauth2_openid.jpg)

## OpenID connect autherization code flow
![openID flow](/assets/images/oauth2/openid_flow.jpg)

## ID token in code/json
![ID token in code/json](/assets/images/oauth2/)

## Anatomy of ID token (JWT) in OpenID
![The ID token](/assets/images/oauth2/jwt_structure.jpg)

## ID Token(JWT) in debugger
![ID TOken(JWT) in debugger](/assets/images/oauth2/jwt_structure1.jpg)

## Implicit Flow example
![Implicit Flow example](/assets/images/oauth2/implicit_flow_example.jpg)

## Server flow example
![Server flow example](/assets/images/oauth2/server_flow_example.jpeg)

## Mobile flow example
![Mobile flow example](/assets/images/oauth2/mobile_flow_example.jpg)

### Third party(SAML) integration example
![Third party integration example](/assets/images/oauth2/sso_third_party.jpg)

**Note:** Using `okta` you can spin your own authorization server in the cloud.
