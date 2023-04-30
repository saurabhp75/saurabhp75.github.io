---
title: "Wagtail"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["Wagtail"]
draft: false
description: "Introduction to Wagtail"
---

Wagtail uses normal Django templates to render each page type.

By default, it will look for a template filename formed from the app and model name, separating capital letters with underscores (e.g. HomePage within the ‘home’ app becomes `home/home_page.html`).

Wagtail supports a multi-site structure, in which each site has a root page. You can manage the site's root page later in Wagtail's admin interface.

## Default structure of wagtail app

- Home page is the root page.
- Search is an app which adds a search function to the project.
- Starting from the root page of that site, Wagtail traverses the page tree, calling the **route()** method and letting each page model decide whether it will handle the request(http://127.0.0.1:8000/blog/post-page-1/) itself or pass it on to a child page.
- Wagtail has a concept called snippets for some contents need to be managed in Wagtail admin, model can be registered as snippet by add @register_snippet decorator.
- After that, you can manage category info directly in Wagtail admin.
