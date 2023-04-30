---
title: "NextJS"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["NextJS"]
draft: false
description: "Introduction to NextJS"
---

## Authentication

- `Server side sessions`: store some unique identifier and also send it to the client/browser. Works well if front end and back end are tightly coupled ie one server. But if there are different servers for front end/SPA and API, this approach doesn't work.

- `Authenticated tokens`: server creates and send a token to the client, but doesn't store it. Server can verify the the token received from the client in subsequent request from its private key.

### Server side rendering:

- The page is rendered at server side.
- In a normal react app, the server sends an empty html page with root div into which the react components are rendered at the client side.
- Server side rendering is good for SEO and first time page load.
- In nextjs are later interaction will be handled by react in the browser.

## Nextjs features:

- Built-in server side rendering..
- File based routing: define pages and routes with files and folders instead of code.
- build fullstack apps: we can add back end code.

## Creating nextjs app

- npx create-react-app.
- Run dev server using `npm run dev`
- `npm run build` to generate code for production/deployment.
- Even for an SPA, nextjs prerenders the page on receiving request from browser and sends it. In a pure react app the index.html file is almost blank and rendering is done at client side.
- `Pages` folder is most important, where we write most of the code.
- `Public` folder contains public visible resources like images etc.
- `Style` folder contains the CSS files.

### Alternative way to keep files for routing

- pages/news.js
- pages/news/index.js

Nested paths are created using subfolder under pages folder.

## Creating dynamic pages

- `[newsId].js`, use square brackets.
- Folder names can also have square brackets.
- `import {useRouter} from 'next/router'`

- to extract parameter from the dynamic path/file.
  - `const route=useRouter();`
  - `route.query.newsId;`

### Linking between pages

- Don't use anchor tags as they will send a new request to the server and reload the page. This way we lose all the state is redux state or context state.
- Instead import Link from 'next/link'

## \_app.js file and layouts

- \_app.js contains the root component, MyApp, which can be used to set layout of all the pages in the next.js application.

## Programmatic navigation

- `import { useRouter } from 'next/router'`

  .

- `const route=useRouter();`
  `route.push('path')`

**Note**: react hydrates the webpage with data/components. The browser show source may contain minimal html.

## Data fetching for static pages

- Nextjs gives us two forms of perendering.
- static generation: page is rendered at the build time. This is the default.
- server side rendering:
- getStaticProps(): used only in page components, under pages folder. This is called before the component function is executed. The code in this function always executed on the server side. It returns a props object, which is passed to component function.
- revalidate: generate the page after a fixed no. of seconds if there is a request for this page.
- getServerSideProps(): the code in this function runs on the server after deployment.

### When to use getServerSideProps ()

- If we need access to request object and.
- If the page content changes frequently.

## Static site generation

- getStaticPaths(): it's used when using a page which is Dynamic and we are using getStaticProps() in it. This is used to generate all possible pages at build time, which a user might visit.
- fallback: need to define it true or false depending upon whether we are generating all possible pages or not.

## Adding API routes to nextjs application

- Create a folder API under paths folder.

### Adding head metadata in nextjs:

- import Head from 'next/head'

  .

- Then add info in head of the html page.

### Deploying nextjs application

- Use vercel.
