---
title: "Facebook login flow"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["Auth", "Facebook"]
draft: false
description: "Introduction to Facebook login flow"
---

Facebook OAUTH

Access token :
When someone connects with an app using Facebook Login and approves the request for permissions, the app obtains an access token that provides temporary, secure access to Facebook APIs.

Identifies a user, app, or Page and can be used by the app to make graph API calls.
The token includes information about when the token will expire and which app generated the token

Types of access tokens

User Access Token
Most commonly used type of token. This kind of access token is needed any time the app calls an API to read, modify or write a specific person's Facebook data on their behalf. User access tokens are generally obtained via a login dialog and require a person to permit your app to obtain one.

App Access Token
This kind of access token is needed to modify and read the app settings. It can also be used to publish Open Graph actions. It is generated using a pre-agreed secret between the app and Facebook and is then used during calls that change app-wide settings. You obtain an app access token via a server-to-server call. App access tokens are used to make requests to Facebook APIs on behalf of an app rather than a user. This can be used to modify the parameters of your app, create and manage test users, or read your apps's insights.

Page Access Token
These access tokens are similar to user access tokens, except that they provide permission to APIs that read, write or modify the data belonging to a Facebook Page. To obtain a page access token you need to start by obtaining a user access token and asking for the manage_pages permission. Once you have the user access token you then get the page access token via the Graph API.

Client Token
The client token is an identifier that you can embed into native mobile binaries or desktop apps to identify your app. Since the client token is used rarely, we won't talk about it in this document.

Generating Access Tokens

1. User Access Tokens

Basic flow for obtaining user token on all platforms.

    1. Client(app) request access and permission via SDK and Login Dialog.
    2. User authenticates and approves permissions.
    3. Access token is returned to the client.

Short-Term Tokens and Long-Term Tokens
Short-lived tokens usually have a lifetime of about an hour or two, while long-lived tokens usually have a lifetime of about 60 days. You should not depend on these lifetimes remaining the same - the lifetime may change without warning or expire early. Access tokens generated via web login are short-lived tokens, but you can convert them to long-lived tokens by making a server-side API(???) call along with your app secret.

2. App Access Tokens
   To generate an app access token, you need to make a Graph API call. Therefore, this API call should only be made using server-side code. This token never expires(?)
   ```
   curl -X GET "https://graph.facebook.com/oauth/access_token
   ?client_id=your-app-id
   &client_secret=your-app-secret
   &redirect_uri=your-redirect-url
   &grant_type=client_credentials"
   ```

There is another method to make calls to the Graph API that doesn't require using a generated app access token. You can just pass your app id and app secret as the access_token parameter when you make a call:

`curl -X GET "https://graph.facebook.com/your-endpoint?key=value&access_token=your-app_id|your-app_secret"`

3. Page access token
   With a page access token you can make API calls on behalf of a Page. For example, you could post a status update to a Page (rather than on the user's timeline) or read Page Insights data.

First get a user access token with “manage_pages’ permission. Then get page acces token using following graph API. The API return json object with page access token along with other information.

```
GET /me/accounts HTTP/1.1
Host: graph.facebook.com
```

Extending Page Access Tokens
Apps can retrieve a page access token from Page admin users when they authenticate with the manage_pages permission. If the user access token used to retrieve this page access token is short-lived, the page access token is also short-lived. If the user access token you use to retrieve this page access token is a long-lived token, you get a long-lived page token that is good for at least 60 days.

WORKFLOW

Workflow of tokens in the app.

    1. First get a short lived user access token using web login.
    2. Then extend that user token to 60 days and store in db.
    3. Now create an extended page access token from extended user token and store.
    4. From time to time keep refreshing extended user and page tokens.

Get a user(short lived) access token using web login :
• Redirect to the below url for login dialog (assuming user not logged in)

```
https://www.facebook.com/v3.1/dialog/oauth?
client_id={app-id}
&redirect_uri={redirect-uri}
&state={state-param}
```

    • redirect-uri will be called with
      `https://www.domain.com/login?state="{st=state123abc,ds=123456789}"`
    with following optional parameters :
    response_type : `(code|token|code%20token|granted_scopes)`
    scope : comma seperated list of permissions
    code :  Response data is included as URL parameters and contains code parameter (an encrypted string unique to each login request). This is the default behavior if this 	parameter is not specified. It's most useful when your server will be handling the token.

    When code is received, it has to be exchanged for an access token using an endpoint. The call will 	need to be server-to-server, since it involves your app secret. (Your app secret should never end up in client code.). To get an access token, make an HTTP GET request to the following OAuth endpoint:

    `GET https://graph.facebook.com/v3.1/oauth/access_token?`

```
client_id={app-id}
&redirect_uri={redirect-uri}
&client_secret={app-secret}
&code={code-parameter}
```

    The response you will receive from this endpoint will be returned in JSON format and, if successful, is:

```
    {

"access_token": {access-token},
"token_type": {type},
"expires_in": {seconds-til-expiration}
}
```

    When token is received, it needs to be verified. You should make an API call to an inspection endpoint 	that will indicate who the token was generated for and by which app. As this API call requires using an 	app access token, never make this call from a client. Instead make this call from a server where you 	can 	securely store your app secret. You can perform automated checks on these tokens using a Graph API 	endpoint:
    ```
    GET graph.facebook.com/debug_token?
     	input_token={token-to-inspect}
     	&access_token={app-token-or-admin-token}
         ```

    The response of the API call is a JSON array containing data about the inspected token. For example:

```
    {
    	"data": {
        "app_id": 138483919580948,
        "type": "USER",
        "application": "Social Cafe",
        "expires_at": 1352419328,
        "is_valid": true,
        "issued_at": 1347235328,
        "metadata": {
            "sso": "iphone-safari"
        },
        "scopes": [
            "email",
            "publish_actions"
        ],
        "user_id": "1207059"
    	}
    }
```

    When code and token are both received, both steps should be performed.

    Note : If people using your app don't accept the Login dialog and clicks Cancel, they'll be redirected to the following.
    YOUR_REDIRECT_URI?

```
error_reason=user_denied
&error=access_denied
&error_description=Permissions+error.
```

Convert short lived user access token to long term user token

```
GET /oauth/access_token?
 grant_type=fb_exchange_token&
 client_id={app-id}&
client_secret={app-secret}&
fb_exchange_token={short-lived-token}
```

    Note : Make this call from your server, not a client

Get page access token from long term user token.

Refresh long term [user token].
• It is a two step procedure. First we refresh long term user token, then refresh the page access token.

```
       https://graph.facebook.com/oauth/client_code?
    	access_token=...&
    	client_secret=...&
    	redirect_uri=...&
    	client_id=…

Argument
Required
Description
access_token
Yes
Long-lived user access token.
client_id
Yes
The App ID.
client_secret
Yes
The app's secret id.
redirect_uri
Yes
The redirect URI
```

    The response will look something like:
    `{"code": "...."}`
      Once you've retrieved the code from Facebook's server you then need to ship it to the client via a secure channel. Once that's done, you need to make a request from the client to this endpoint. (?? can we make this call from server?? I think its not possible due to fb spam prevention mechanism).

    https://graph.facebook.com/oauth/access_token?
    	Code=...&
    	client_id=...&
    	redirect_uri=...&
    	machine_id= ...

    API to be called with following arguments.

Argument
Required
Description
client_id
Yes
The App ID.
code
Yes
The code returned from FB server.
redirect_uri
Yes
The redirect URI.
machine_id
No
An important per-client (not per-user) value that tracks clients and is used for security. If you're previously made calls to get a code and been provided a machine_id you should include it here.

The response will look like:
`{"access_token":"...", "expires_in":..., "machine_id":"…"}`

Value
Description
access_token
A new long-lived access token that you can use for Graph API calls.
expires_in
The number of seconds until this access token expires.
machine_id
The machine_id for this client. Please store this for future calls to generate a new access token from a code. This helps identify this client and is used to prevent spam.

Refresh long term “page token” from long term “user token”

GET https://graph.facebook.com/your-page-id?
fields=access_token&
access_token=your-user-access-token

The response will look like this:

```
{
"access_token": "CAACEdEose0cBACCZBZA5qz1ZBjUX...",
"id": "your-page-id"
}
```
