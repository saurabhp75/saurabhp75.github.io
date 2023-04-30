---
title: "JQuery"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["JQuery"]
draft: true
description: "Introduction to JQuery"
---

### Jquery

In jQuery, you don't need for loop when manipulating a selection, unlike vanilla js.

- use $(), to select element(s) using CSS selectors. It works like document.quesrySelectorAll().
- use .css(property, value) to style them. We can also pass CSS object directly to css().

### Psuedo selectors

- div: first-of-type , selects first div.

### Common jQuery methods(getters and setters)

- `text()`: gets text of element and it's descendents.
- `val()`: get/set value of an input element.
- `attr()`: get/set attr of an element
- `html()`: works like innerHTML()
- `addClass()`:
- `removeClass()`:
- `toggleClass()`:

### To select first or last element from a selection

- $("li").first()
- $("li").last()

### jQuery events

- click(func1)
- keypress(func1(event)): keyup(), keydown()
- on(event, func1): similar to addEventListener(). Used most often.

### .click(func1) Vs .on("click", func1):

- on("click") also adds listener to future elements, whereas on() does not.

**Note**: use $(this) in jQuery, when adding an event listener.

### jQuery effects

- `fadeOut(intervalMs, func1)`: both arguments are optional. The element is not removed, only display is set to none. Func1 is called after interval. Func1 is generally $(this). remove().

- `fadeIn()`: same arguments as fadeOut().

- `fadeToggle(intervalMs)`:

- `slideDown()`: animates the height(increasing)

- `slideUp()`: animates the height(decreasing)

- `slideToggle()`:
