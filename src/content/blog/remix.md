---
title: "RemixJS"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["RemixJS"]
draft: false
description: "Introduction to RemixJS"
---

To run development server: remix dev
To build app for production: remix build

## Remix folder structure

- app/ - This is where all your Remix app code goes.
- app/entry.client.tsx - Contains code that runs on client. This is the first bit of your JavaScript that will run when the app loads in the browser. We use this file to hydrate our React components.
- app/entry.server.tsx - Contains code that runs on server. This is the first bit of your JavaScript that will run when a request hits your server. Remix handles loading all the necessary data and you're responsible for sending back the response. We'll use this file to render our React app to a string/stream and send that as our response to the client.
- app/root.tsx - This is where we put the root component for our application. You render the `<html>` element here.
- app/routes/ - This is where all your "route modules" will go. Remix uses the files in this directory to create the URL routes for your app based on the name of the files.
- public/ - This is where your static assets go (images/fonts/etc)
- remix.config.js - Remix has a handful of configuration options you can set in this file.

when you build(remix build) remix application, following folders are created.

- /build:
- /public/build:
- /.cache:

Nested routes:

- Remix support nested routes where the child route is rendered within the parent route. In nested routing, parents are responsible for laying out their children using `Outlet` component.
- Each route's CSS can be loaded and unloaded as it is accessed.
- Each route has its own module with its own data loader, ie, the server sends only the data required by a particular route.
- Each module is responsible for rendering a part of the page.
- In other frameworks, the nested routes are supported but each module must render the entire page.
- A CSS file from the parent route affects the child routes.
- All the loaders of nested routes are called on a page.

Note: Routes can also be created programatically via the remix.config.js file.

Each file we put in the app/routes directory is called a "Route Module" and by following the route filename convention, we can create the routing URL structure we're looking for. Remix uses React Router under the hood to handle this routing.

index route (/) is handled by file/module at app/routes/index.tsx.

## Nested routes and styling

Remix brings the power of its Nested Routing support to CSS and allows you to associate links to routes. When the route is active, the link is on the page and the CSS applies. When the route is not active (the user navigates away), the link tag is removed and the CSS no longer applies.

.server part of the filename informs Remix that this code should never end up in the browser.

## TW CSS support

- tw requires a CSS file , ie from cdn, import statement etc.
- Any framework which provide a CSS file should work well with TW.

Link tag with to attribute set as '.' refreshes the page(sends fetch, Get, post?) and updates the page data.

## Mutations/Forms

## HTML form attributes

- method: POST or GET. Browser sends either POST or GET request.
- action: url, where the browser should send the request and navigate to.

## When the user submits a form, Remix will:

- Call the action for the form
- Reload all of the data for all of the routes on the page (revalidation of routes), to sync the state with server.

HTML forms support two HTTP verbs:
GET: Remix will figure out what parts of the page are changing and only fetch the data for the changing layouts, and use the cached data for the layouts that don't change
POST: Remix will reload all data to ensure it captures the update from the server.

HTML get: It is mostly used in search pages. Data is sent in query string (search params), it is similar to navigation via the link `<a>` tag except that the URL is provided by the user.

HTML form vs Remix Form:

- `<Form reloadDocument>`: This lets the browser continue to handle the pending UI state (spinner in the favicon of the tab, progress bar in the address bar, etc.)
- In Remix Form, you get access to pending form state to build a nicer user experience: like contextual loading indicators and "optimistic UI".

SSR vs SSG

- In SSG, you install the static files to a CDN.
- The cache gets blown off everytime you build and redeploy the app.
- So the UX is not very good.
