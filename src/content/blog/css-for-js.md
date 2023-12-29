---
title: "CSS for JS"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["CSS", "Frontend"]
draft: false
description: "Introduction to CSS"
---

# 0: Fundamentals recap

## CSS building blocks

- `rule/style`: Collection of _declarations_ targetting on or more `selectors`.
- `declaration`: property + value
- `selector`:
- `property`:
- `stylesheet`: Collection of rules.
- `unit`: for eg. `px`, `rem`, `%`.

```css
/* rule/style */
.code-snippet {
  padding: 32px; /* First Declaration */
  white-space: pre-wrap; /* Second Declaration */
}
/* code-snippet: selector
   padding: property */
```

## media queries

```css
/* CSS */
@media (condition) {
  /* Some CSS that'll run if the condition is met. */
}
```

## Responsive design

- `Mobile first design`: Define CSS default rules for small screens and exceptions for bigger screens. For eg `@media (min-width: 600px) { rules for bigger screens }`
- `max-width: 1080px`: Apply the rule only when width is less than 1080px.
- `min-width: 768px`: Apply the rule only when the width is greater than 768.

## What is an iframe

- An embedded HTML document within the main HTML document.
- It's a page within a page.

## Pseudo classes

- `hover`:
- `focus`:
  - Interactive elements like buttons, links, and form inputs.
  - When we interact interactive elements (either by clicking on it or tabbing to it), it becomes focused.
- `checked`: Only applies to `checkboxes` and `radio buttons`.
- `first/last-child`: Match the first/last child within a parent container.
- `first/last-of-type`: First/last type in the parent container. Represents the first/last element of its type among a group of `sibling` elements.

```css
/* Target the last paragraph child in a container */
p:last-child {
  margin-bottom: 0px;
}
```

## Pseudo elements

- `::placeholder`: Targets placeholder text in form input.
- `::before/after`: These pseudo-elements are added inside the element, right before and after the element's content. `:: before/after` should not be used due to accessibility concerns.

## Pseudo classes vs pseudo elements

- Pseudo classes targets specific `state` of an element.
- Pseudo classes use _1 colon_.
- Pseudo elements targets _sub-elements_ within an element.
- Pseudo elements use _2 colon_, though some also support one colon.
- Pseudo-elements selectors target elements in the DOM that aren't explicitly created with HTML tags.

## Children vs descendents

- `Child` is only _1 level_ down from the parent.
- `Descendent` can be _any levels_ down.

## Combinators in selectors

- `space`: for eg `nav a`, means any anchor tag which is **descendent** of nav.
- `>`: Selects only direct **child** element.

## Color formats

- `Hex codes`: For eg `#FF0000`.
- `keyword`: for eg `red`.
- `HSL(preferred)`: For eg `hsl(0deg, 100%, 50%)`
  - `Hue`: pigment type,
  - `Saturation`: pigment saturation,
  - `Lightness`: white to black
- `hsla`: Adds transparency. For eg `hsl(340deg 100% 50% / 0.75);`
- `rgb`: For eg `rgb(255,0,0)`, gives opaque colors
- `rgba`: Adds transparency, through alpha channel (0 to 1). 1 is opaque, 0 is transparent. For eg `rgba(255, 0, 0, 0.5);`

## Units

- `px`:
- `em`: Not used much often. It compounds.
- `rem`: relative to root element (html). `font-size` should be in `rem` and not in `px` or `em`. If `px` is used then font scaling won't work.
- `Percentage`: Often used with width/height, as a way to consume a portion of the **available space**.

**Note**:

- You shouldn't actually set a `px` for `font-size` on the `html` tag. This will override a user's chosen default font size.
- The Web Content Accessibility Guidelines (WCAG) state that in order to be accessible, a site should be usable at 200% zoom.
- If you really want to change the baseline font size for rem units, you can do that using percentages. Using `px` will mess up the font scaling.
- `1rem` was equal to 16px? That's only true if the user hasn't touched their default font size!

## Where to use rem or px

- Should this value scale up as the user increases their browser's default font size?.
- `font-size` should use rem units instead of px, this enables font scaling by the user.

## Browser zooming vs font scaling

- Zooming affects everything except viewport units (like vw and vh).
- Font scaling affects everything expressed in `rem` and `em`.

## Typography

- We can change which font is used with the `font-family` property
- `Font family`: Collection of charcter sets for different `font weights` and `variants` (normal and italics).
- `Web safe fonts`: These are fonts that come pre-installed on all major operating systems, like `Arial`, `Times New Roman`, `Tahoma`.

## Font style/category

- Font family come in different styles, the 2 most popular are `serif` and `sans-serif`.
- `Serif`: Has adornment at the edge. Common in print media but not on web.
- `Sans-serif`: Used on web, they don't have the adornments and don't look aged.
- If we specify a category (serif, sans-serif), the OS will use its default font for that category.
- For eg, if we specify `sans-serif`, Windows 11 will use `Segoe UI`, while MacOS Ventura uses `SF Pro`.
- It is useful if we want our site/app to feel native to it splatform.
- But in general, we want to have our own branding! We can do this with a `web font`.

## Web fonts

- It is a custom font that we load in our CSS, allowing us to use any font we like.
- Quotes are required for multiword fonts but as a convention it is used for web fonts. Font stack is specified for fallbacks.

```css
/* notice the quote */
font-family: "Roboto", Arial, sans-serif;
```

### Font stack

- `font-family: 'Roboto', Arial, sans-serif;`
- The idea is that the browser will use the first available font from the list.
- If Roboto isn't available (eg. because the download failed, or it's simply taking too long), we'll use Arial instead. And if the user's device doesn't have Arial, it'll fall back to the system-default sans-serif font.

## Typical text formatting

- **Bold text**: Use `font-weight` property. The default/normal value for font weight is `400`, and the`bold` keyword maps to `700`.
- **Italic text**: `font-style: italic;`
- **Underlined text**: `text-decoration: underline|none;`

## Styles and semantics

- CSS change the cosmetic presentation of text, but it doesn't affect the semantic meaning of the markup.
- For that, we need to use specialized HTML tags.
- Used for screen readers and accessibility.
- Used for `copy`, ie the text content of site/app.
- Does not apply to UI elements like input labels. Here we can use CSS.
- `<strong>`: Used for dritically important or urgent text.
- `<em>`: Used to emphasise the text.

## Alignment

- `text-align: left|right|center`
- Not used for other elements like image etc.

## Text transforms

- `text-transform: uppercase|capitalize;`

## Spacing

- `letter-spacing: 3px;`
- `line-height: 1.5`: Takes a unitless number, which is related to font-size.
- To comply with accessibility guidelines(WCAG), body text should have a minimum line-height of 1.5.

# 1:Rendering logic-1

## user-agent stylesheet

- Each browser includes their own stylesheet. For eg anchor tag has underline and certain color and pointer.

## Inheritance

- Certain CSS properties inherit from parent to child element like color, others don't like border.
- Most of the properties that inherit are typography-related, like color, font-size, text-shadow, and so on.

## Forcing inheritance

- We can force a property to be inherited from parents by specifying `inherit`, for eg. `color: inherit;`

## The Cascade

- Rules declared later are applied first

## Specificity

- No need to learn it by heart, modern tooling takes care of this.
- In component based framework, the CSS is localised with the componenet.

```javascript
const appliedStyles = {
  ...inheritedStyles,
  ...tagStyles,
  ...classStyles,
  ...idStyles,
  ...inlineStyles,
  ...importantStyles,
};
```

## Block and Inline Directions

## Logical properties

- These are used because not all languages are left to right, top to bottom.
- The main selling point for logical properties is `internationalization`.
- `Block direction` is like lego blocks: they stack together one on top of the other.
- `Inline direction` is like people standing in-line, they stand side by side.
- `margin-block-start: 1em;`
- `margin-block-end: 1em;`
- `margin-inline-start: 0px;`
- `margin-inline-end: 0px;`

## Box model

### The four aspects that make up the box model are:

- Content
- Padding
- Border
- Margin

## Box Sizing

- `box-sizing: content-box;`: This is the browser default.
- `box-sizing: border-box;`: This is more user freindly.

### Note

The `default` value for the width property is `auto`. By default, for most `block` elements, this means _automatically grow to fill as much space as possible_.

## Padding

- Pixels(px) are the best unit to use for padding (and other box model properties like margin/border).

## Shorthand properties

- Applies to border, padding, margin, border-style/width/color etc.

## Border

- The only required field is border-style. Without it, no border will be shown.

## Flow Layout

- Flow layout is the default layout mode.
- Other layout modes are `flexbox`, and `Grid`.

### Two main element types in Flow layout

- `Block elements`: headings, paragraphs, footers, asides. The chunks of content that make up a page.
- `Inline elements`: links, or a string of bold text. Generally, inline elements are meant to highlight bits of text, or elements within a block container.
- In flow layout, block elements stack in the block direction, and inline elements stack in the inline direction.

### Block elements

- Content box greedily expands to fill the entire available horizontal space.
- Elements that are `display: block` will stack in the block direction, regardless of their size.
- To force it to shrink down to the minimum size required for the text, We can use special width keyword `fit-content`.

### Inline elements

- You can shift things in the inline direction with `margin-left` and `margin-right`.
- you can't give it a width or height.
- Inline elements can line-wrap and can produce shapes other than boxes.
- This helps explain why certain CSS properties aren't available for inline elements. What would it even mean to increase the vertical margin on a shape like this?

### Inline-block

- properties like width and margin-top work on inline-block elements.
- Inline-block doesn't line-wrap.

### Replaced elements

- These elements are all technically inline, but they're special: they can affect block layout. You can give them explicit dimensions, or add some margin-top.
- A replaced element is one that embeds a "foreign" object.
- This includes: `<img />, <video />, <canvas />`.

## Inline elements have magic space

- Inline elements adds a height to the container elements as they are treated as text. Use `display:block` in inline element or `line-height:0` on container element to remove this space.
- HTML is space-sensitive, at least to an extent. this issue is specific to Flow layout.
- Other layout modes, like Flexbox, ignore whitespace altogether.

## Width algorithms

- Block elements have a default width value of auto, not 100%.
- percentage-based widths are based on the parent element's content space.
- `width: auto`: Works very similar to margin: auto; it's a hungry value that will grow as much as it's able to, but no more. It will respect margin etc.
- `width: 100%`: Will fill the container and don't respect margin etc.

## Keyword values

- Measurements (100%, 200px, 5rem)
- Keywords (auto, fit-content)

## Intrinsic vs extrinsic value

- `Intrinsic value`: Based on content of the element, for eg min-content.
- `Extrinsic value`: Based on the space made available by element's parent for eg, auto.

### min-content

- We want our element to become as narrow as it can, based on the child contents.

### max-content

- The element's width will be the smallest value that contains the content, without breaking it up.
- it never adds any line-breaks.

### fit-content

- If that width can fit within the parent container, it behaves just like max-content, not adding any line-breaks.
- If the content is too wide to fit in the parent, it adds line-breaks as-needed to ensure it never exceeds the available space. It behaves just like width: auto.

## min-width max-width

- We can add constraints to an element's size using `min-width` and `max-width`.
- They let us mix units. We can specify constraints in pixels, but set a percentage width.
- We can create a max width wrapper using `max-width` property.

### Figures and captions

- `<figure>`: allows us to display any sort of **non-typical** content: images, videos, code snippets, widgets, etc.
- It also lets us caption that content with `<figcaption>`.
- `<figure>` elements are block-level elements, which means they fill the available horizontal space.

## Height Algorithms

- Default "height" behaviour is to be as small as possible while fitting all of the element's content.
- We generally want to avoid setting fixed heights (to prevent overflows).
- Having a full-height container is an important pre-requisite.

## Setting the minimum height to 100% of browser window

- `min-height:100%`: This doesn't work because the parent element (body) does'nt have a specific height so it uses the default behaviour: start as shorts as possible while still containing all children.
- So body depends on children and child elements is depending on parent.
- `Solution`: Set the height of all the parents upto html as 100%. Then put min-height:100% on the element. Don't try and use percentage-based heights within that wrapper.

## Why does height: 100vh doesn't work

- In mobile devices scrolling changes the vh.
- The address bar and footer controls slide away, yielding their space to the content.

## Important difference between width and height

- Width looks up the tree, while height looks down the tree.
- An element's width is calculated based on its parent's size, but an element's height is calculated based on its children.

Note: `margin:auto` behaves differently in flex layout.

## Margin vs padding

- Margin is meant to increase the distance between siblings.
- Margin is not meant to increase the gap between a child and its parent's bounding box, that's what padding is for.
- Margin will always try and increase distance between siblings, even if it means transferring margin to the parent element.

## Margin Collapse

- Adjacent margins will **sometimes** "collapse", and overlap.
- This is unlike padding and border.

## Rules of Margin Collapse

### Rule:1

- Only vertical margins collapse (in horizontal writing mode).
- More precisely only block-direction margins collapse.

### Rule:2

- Margins only collapse in Flow layout.
- For other layouts(positioned, flexbox, grid) margins don't collapse.

### Rule:3

- Only adjacent elements have their margins collapsed.
- If there is any element in between for eg `<br/>`, then margin won't collapse.

### Rule:4

- The bigger margin wins.

### Rule:5

- Nesting doesn't prevent collapsing.

### Rule:6

- Margins only collapse when they're _touching_.
- Blocked by padding or border.
- Blocked by a gap: When parent element has explicit height & blocks margin collapsing.
- Blocked by a scroll container: When parent element creates scroll container with `overflow: auto` or `overflow: hidden`.

### Rule:7

- Margins can collapse in the same direction.
- An extension of _The bigger margin wins_ rule.
- For eg parent having greater margin than the child will aborb the margin.

### Rule:8

- More than two margins can collapse.
- Combination of rule5 & rule7.

### Rule:9

- Negative margins also collapse.
- For eg. `margin-bottom: -25px` and `margin-top: -75px` will collapse to -75px (the greater of the two).
- Negative and positive margin cancel each other, for eg `margin-bottom: -25px` and `margin-top: 25px` will cancel each other.

### Rule:10

- Multiple positive and negative margins.
- If there are more than 2 margins involved, the algorithm looks like this:
  - All of the positive margins collapse together (eg. 10px and 50px collapse into a single 50px margin).
  - All of the negative margins collapse together (eg. -20px and -30px collapse into a single -30px margin).
  - Add those two numbers together (50px + -30px = 20px).

## Using Margin Effectively

- Growing trend amongst JS dev is to forego margin altogether, and use a combination of `padding` and `layout` components instead.
- This isn't possible for most folks. Unless you're starting a brand-new project, and the entire team is onboard.

# 2: Rendering Logic II

## Positioned layouts

- The defining feature of `positioned layout` is that items can overlap.
- Relative positioning can be applied to both `block` and `inline` elements.
- We can opt into Positioned layout using the `position` property.
  - `static`: Default
  - `relative`
  - `absolute`
  - `fixed`
  - `sticky`
- If an element is currently using Positioned layout and you want to opt out, you can set `position` to either `static` or `initial`.

## Relative positioning

- It does two things:
  - Constrains certain children (we'll get to this shortly!)
  - Enables additional CSS properties to be used.
    - `top`
    - `left`
    - `right`
    - `bottom`
- With relative positioning, those values are relative to its `natural position`.
- `negative values`: `left: -10px` has the same effect as `right: 10px`.
- Relative positioning can be applied to both `block` and `inline` elements.

## Moving elements with margin vs positioning

- `Position` doesn't impact layout and container/element width, unlike `margin`. Other elements are not effected when using position..
- The element dimesions (width etc) also remain unchanged when using relative position.
- The browser acts like the element is still in its original position.
- The displacement is purely cosmetic.

## Absolute Positioning

- Takes an element out of `document flow`.
- Absolutely-positioned elements are adjusted based on their **container**, not based on their in-flow position (like relative position).
- We generally use absolute positioning for things like:
  - UI elements that need to float above the UI, like tooltips or dropdowns.
  - Decorative elements that need to be stuck in certain positions (eg. abstract illustrations).
  - Stacking multiple elements in the same place, like a deck of cards.

**Note**: Any time you want an element to be "floating above" the content, like a `tooltip` or a `dropdown` or a `modal`, absolute positioning is your friend.

## Default placement of absolute positioned elements

- If we don't give our absolute element an anchor (top/bottom/left etc), it sits in its default `in-flow` position.
- The line wrapping is a flow layout thing and will not apply to positioned inline elements.
- Think of it as _inheriting_ its default position from `flow layout`.

## Absolute sizes

- Block and inline display doesn't have any effect on width of absolute positioned element.
- Width shrink to fit the content and is limited by the width of containing block.
- The content will line wrap if it exceeds the width of the containing block.

## Centering Trick: Absolute positioning

- In absolute positioning both horizontal & vertical margins grow unlike normal flow where only width grow.
- So, following will centre an absolute positioned element.
  - absolute positioning (position: absolute)
  - Equal distances from each edge (ideally 0px)
  - A fixed size (defined width and height properties)
  - Hungry margins (margin: auto)

```css
.box {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  width: 100px;
  height: 100px;
  margin: auto;
  background: deeppink;
}
```

## The “inset” property

- Setting `inset:0px` sets top, right, bottom, left simultaneously.

```css
.box {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.box {
  inset: 0;
}
```

## Containing Blocks

- In CSS, every HTML element has a `containing block`.
- Absolute positioned elements don't respect padding of containing block (as they are taken ou of document flow).
- In Flow layout, elements are contained by their parents.
- Absolute elements can only be contained by other elements using Positioned layout.
- Algorithm for finding conatining block of absolutely positioned element.
  - Crawl up through the tree, look for a Positioned ancestor.
  - The first one it finds will provide the containing block.
  - If there aren't any Positioned ancestors, then viewport is the containing block.

## Stacking Contexts

- How does the browser decide which element to render "on top" when elements overlap? Depends on layout model.
- In Flow layout, elements don't overlap much, but we can force it with negative margin.
- In Flow layout, background colors and borders are truly meant to be in the background. The content will float on top.
- As a general rule, positioned elements will always render on top of non-positioned ones.
- In Flow layout, background colors and borders are truly meant to be in the background. The content will float on top in case of overlapping elements.
- When we create a stacking context, any child of that element is only compared with other children of that element.

## Summary of stacking

- Positioned elements will always render on top of non-positioned ones.
- When all siblings are rendered in Flow layout, the DOM order controls how the background elements overlap, but the content will always float to the front.
- If one sibling uses positioned layout, it will appear above its non-positioned sibling (Flow, Flexbox, Grid etc.), no matter what the DOM order is.
- If both siblings use positioned layout, the DOM order controls which element will be on top. Unlike in Flow layout, the content does not float to the front.

## Z-index

- If we want the layered order to be different from the DOM order, we can use the `z-index` property to manually reorder them.
- _z-index only works with positioned elements (Also with flex/grid children)_. It has no effect on elements rendered in Flow layout.
- Elements with a higher z-index are placed closer to the viewer in 3D space.
- `Default value` of the z-index is `auto`, which is equivalent to the number `0`.
- z-index values must be integers, they can be negative. z-index: -1 is a valid declaration, though not used often.

## Stacking contexts

- z-index values are not global, they are not compared across entire application.
- Ways to create stacking context:
  - Combining a `non-static` position with a z-index.
  - Setting opacity to a value less than 1.
  - Setting position to `fixed` or `sticky` (No z-index needed for these values!).
  - Applying a mix-blend-mode other than normal.
  - Adding a z-index to a child inside a `flex` or `grid` container.
  - Using transform, filter, clip-path, or perspective.
  - Explicitly creating a context with isolation: isolate.

## Managing z-index

- `z-index wars`: z-index inflation.
- We can avoid it by:
  - Relying on DOM order instead of z-index, in some case. Swapping DOM order may lead to usability/accesibility issues for interactive elements (links, buttons, form inputs).
  - Bundle up our layers into an isolated stacking context.

## Isolated stacking contexts

- `isolation: isolate;`: Isolation property creates a stacking context without setting a z-index.
- This _flattens_ all child elements.

## Portals

- Advanced React feature, often used for tricky UI elements like modals, tooltips, and dropdowns.
- Allows us to keep the global UIs on top.

## Fixed positioning

- Somewhat similar to absolute positioning, but the containing block is `viewport`.
- Main advantage of fixed-position elements is that they're `immune to scrolling`.
- The element is taken out of flow.
- The default width of fixed positioned element is 0px. It shrinks to fit.

## Centering with fixed position.

- Similar to centering using abolute position, using anchor points.
- This is used to center overlays like modals.

## Fixed without anchor points

- The element will be placed in the normal flow position, similar to absolute position, but it will not move in the viewport.

## Incompatibility of fixed with certain CSS properties

- Certain CSS properties, when applied to an ancestor, will mess with fixed positioning.
- For eg. `transform` property applied to the parent. The element will behave similar to absolute positioned element.
- Same behaviour happens when `filter` and `will-change` property are applied to the ancestor.

## Overflow

- Typically, if not specified, block elements have variable height, they can grow as-needed to contain their children.
- The overflowed content does not effect layout.

## Overflow property values

- `visible`: **Default** value, which allows an element's content to extend beyond its bounds.
- `scroll`: _Always_ show scrollbars, for both axes. This is how it works on Windows and Linux. MacOS is the outlier here.
- Shorthand for 2 different properties: `overflow-x`, `overflow-y`.
- `auto`: Adds a scrollbar when one is required, `recommended` for most situations. This causes layout shift so not advisable to use everywhere, when you know scroll will be required, then go for `overflow: scroll;`
- `hidden`: Truncates anything that extends beyond the bounds of the container.
- `clip`: Works like `hidden` but _does not create a scroll container_. If the container has a border-radius set, it will force the clipping to happen in both directions in certain browsers.

**Note**: `overflow: hidden` is identical to overflow: scroll, but with the scrollbars removed.

## Scroll Containers

- When we set the overflow property to `scroll`, `hidden`, or `auto`, we create scroll container.
- This is true whether we set the property on the X axis, Y axis, or both.
- When a container becomes a scroll container, it manages overflow in **both directions**.
- When a child is placed in a scroll container, it guarantees that the child will never spill outside of it.

## Horizontal Overflow

- `white-space: nowrap;`: Lets us tweak how words and other inline/inline-block elements like image wrap.
- By setting it to `nowrap`, we instruct the container to never break lines. That, in tandem with `overflow: auto`, allows us to achieve a horizontally-scrollable element.

## Positioned Layout and overflow

- Every element is contained by a block.
- Most of the time, it's the parent, but absolutely-positioned elements ignore their parents unless they, too, use positioned layout.
- Absolutely-positioned elements act just like static-positioned elements when it comes to overflow. They create scroll container, even if they are not part of document flow.

## Fixed positioning and overflow

- Children with `fixed` position don't add scrollbar to parent/containing element.
- This is because fixed positioned elements are conatined by the viewport rather than the DOM.
- Fixed position elements are also immune from being hidden with `overflow: hidden`.

## Sticky Positioning

- The idea is that as you scroll, an element can **stick** to the edge.
- At that moment, it transitions from being relatively-positioned to being fixed-positioned.
- In addition to setting `position: sticky`, you also need to pick at least one edge to stick to (top, left, right, bottom).
- With sticky positioning, the value controls the minimum gap between the element and the edge of the viewport while the container is in-frame.

## Sticky element stays in their box

- The `sticky` element will **never** follow the scroll outside of its parent container.
- This is unlike `fixed` positioned element;

## Offset

- Sticky element are not incorporeal unlike `absolute` and `fixed` elements.
- Sticky elements are like `relative` or `static` elements in this regard, they're laid out in-flow.

## Horizontal stickiness

- This is rarely used but is theoritically possible to _create_ it when the `container` is wider than viewport.

## Sticky positioning and browser support

- `position: sticky` is supported across all major browsers.

## Troubleshooting sticky positioning

- When it comes to sticky positioning, elements stick to the closest scroll container.

- `position: sticky` can only stick in one `context`. If it's within a scroll container, it can only stick within that container.

- Solution:
  - If the culprit/ancestor uses overflow: hidden, we can switch to overflow: clip. Because overflow: clip doesn't create a scroll container, it doesn't have this problem!
  - If the culprit uses auto or scroll, you might be able to remove this property, or push it lower in the DOM. This is a tricky problem.

## Hidden Content

- There are a variety of ways to hide elements in CSS.

- `display: none`: Element is removed from the DOM, it is totally invisible and incorporeal.

- `Visibility: hidden`: The item can't be seen, but it's still there, taking up space. Not commonly used, because generally you don't want a big hole in your UI.

- opacity: Hiding an element with opacity does not remove it from flow. In fact, items hidden with opacity aren't really hidden.
  - Buttons can still be clicked.
  - Text is still selectable.
  - Form elements can still be focused.

## Accessibility

- We can tell screen readers to ignore an element using the `aria-hidden = true;` attribute.
- "inert" attribute allows us to indicate to screen-readers to ignore interactive content inside the aria-hidden component.

# 3: Modern Component Architecture

## What are CSS in JS libraries

- A tool is considered “CSS in JS” if the CSS is processed in some way by JavaScript at runtime before being applied.

## Tagged Template Literals

## details & summary tags

- `details` and `summary` tags can be used for FAQs.

## CSS variables aka Custom properties

## Component libraries

- A component library is a collection of generic, reusable components that can be dropped in to multiple applications.
- It's a way to ensure consistency between products, and it can help boost new development speed, since you have a suite of drop-in primitives and don't have to build everything from scratch.

## Design systems and design tokens

- A design system is essentially the "designer version" of a component library.
- Instead of a suite of React components, though, a design system is made up of a suite of vector graphics produced in tools like `Figma` or `Sketch` or `Adobe Illustrator`.

## Design tokens

- Design systems also consist of design tokens. A lot of systems will specify scales for sizes or colors, and a design token is a value in that scale.

# 4: Flexbox

- Flexbox is one of many `layout modes` in CSS, like `Flow layout` or `Positioned layout`.
- Flexbox is most handy when we have a set of things, and we want to control their distribution along a `primary axis`, either horizontally or vertically.
- Flexbox is still relevant, even with CSS Grid reaching wide browser support. It's a different tool for a different job: `CSS Grid` works best for `two-dimensional layouts`, while - `Flexbox` offers more flexibility for working with a `single dimension`.
- When we apply `display: flex`` to an element, we toggle layout algorithm for the element's children. The parent element will still use Flow layout.

## Directions and Alignment in Flexbox

- To center an element in a conatiner.
- Make container as flex, if possible, give it 100% height.
- Set `justify-content` and `align-items` to `center`.

## Alignment tricks

- Baseline Alignment: `align-items: baseline`;

## Growing and shrinking

- In a flex container, the item `width` in `flex-row` becomes `item height` in `flex-column`. The `flex-basis` property always is in direction of `primary axis`.
- ` flex-basis` can't scale an element below its `minimum content size`, but `width` can.
- Both width and `flex-basis` will change the `hypothetical size` of an element, but width can set that value below the `minimum content size`. flex-basis can't.
- `flex-basis` has priority over `width` in flex-row direction. and over `height` in flex-column direction.
- There are two important sizes when dealing with Flexbox: the `minimum content size`, and the `hypothetical size`.
- The `minimum content size` is the smallest an item can get without its contents overflowing.
- Setting width in a flex row (or height in a flex column) sets the hypothetical size. It isn't a guarantee, it's a `suggestion`.
- `flex-basis` has the same effect as width in a flex row (height in a column). You can use them interchangeably, but flex-basis will win if there's a conflict.
- `flex-grow` will allow a child to consume any excess space in the container. It has no effect if there isn't any excess space.
- `flex-shrink` will pick which item to consume space from, if the container is too small. It has no effect if there is any excess space.
- `flex-shrink` can't shrink an item below its minimum content size.

## Ratios

- When we use `flex-grow` and `flex-shrink`, we use unitless values like 1 or 10.
- They represent a `ratio` of the `available space`.

## The flex shorthand

- flex takes 3 individual values:
  - `flex-grow`, as a unitless value (eg. 1)
  - `flex-shrink`, as a unitless value (eg. 5)
  - `flex-basis`, as a length unit (eg. 200px)
- By default, `flex-grow` will distribute any extra space that isn't taken up by the elements.
- `flex: 1` will assign `flex-grow: 1`, but it will also set `flex-basis: 0`. It won't affect the `default value` for `flex-shrink`, which is `1`.
- Since `flex-basis` is a synonym for width in a flex row, we're effectively shrinking each child to have a `hypothetical width` of 0px, and then distributing all of the space between each child.

## Effect of flex basis when flex-grow is 1 or any number

- `flex-basis:0;`: Equally (by ratio) distribute **ALL** space.
- `flex-basis:auto;`: Equally (by ratio) distribute **EXTRA** space.

## Constraints

- `flex-grow`, `flex-shrink`, and `flex-basis` can be used to control the proportions between siblings in a flex container.
- We can set hard limits, rather than ratios using `min-width/max-width` and `min-height/max-height`.

Fortunately, a familiar set of properties can help us out here: min-width/max-width and min-height/max-height

## Flex wrap

- `flex-wrap: wrap;`

- We set a deafult hypothetical size, when an item falls below this size,flexbox will wrap it to the next line and grow as needed.

## Content vs items

- Content is group of items.

## Groups and Gaps

- `margin: auto;` in flexbox is a greedy value, it will expand as needed.
- `gap:4px;`: Gap property is set in flex container, it sets the gap between items along primary axis;

## Ordering

- `flex-direction`: row-reverse|column-reverse. Changes only the visual order. No change in navigation order via keyboard or screen reader.
- `order: 1`
- `flex-wrap: wrap-reverse`.

## Flexbox Interactions

### Positioned flex children

- When there is a conflict between layout modes, positioned layout always wins.
- As a general rule, elements can't participate in multiple layout modes at once. Either it's using flexbox, or it's using positioned layout.
- An exception to this rule is relative positioning. The element is first laid out inside the flex container, and then transposed using top/left/right/bottom by positioned layout.

### Margin collapse in flex container

- Margin collapse is exclusive to Flow layout. It doesn't happen when elements are laid out inside a flexbox parent.

### z-index in flex container

- Flexbox algorithm also supports `z-index`.
- If our element is being laid out with Flexbox, it uses z-index as if it was rendered with `Positioned layout`.
- The same thing is true for CSS Grid; a child in Grid layout can use z-index without setting `position: relative`.

# 5: Responsive and Behavioural CSS

## Working with mobile devices

- `device pixel ratio`: Ratio between the physical LED pixels on the device, and the "theoretical" pixels we use in CSS.

- On iPhone it is `3`. This means that a 10px length will actually be 30px long. Each `software pixel` actually corresponds to 9 `hardware pixels`.

- In CSS, we can only access software pixels.

- `console.log(window.devicePixelRatio);`

## The magical meta tag

- `meta name="viewport" content="width=device-width, initial-scale=1"`
- `width=device-width`: Instructs the browser to set the viewport width to match the device's width (so, 320px instead of 980px).

- `initial-scale=1`: Says that we should start at 1x zoom.

## Mobile Testing

## Media Queries

- rem based media queries are recommended in most situations.

## Other Queries

### Hovering

- In iOS Safari, that tapping on an interactive element (like a link or button) triggers the hover state.
- Android devices work the same way. Tapping an interactive element will show the `hover`` state. It'll stay hovered until you tap somewhere else.
- We shouldn't think of hover events as a "big screen thing", we should think of them as a "mouse/trackpad thing"

## Boolean logic in media queries

```css
/* Allows us to apply styles based on
   input mechanism the user is using. */
@media (hover: hover) and (pointer: fine) {
  button:hover {
    text-decoration: underline;
  }
}
@media (prefers-color-scheme: dark) {
  /* Dark-mode styles here */
}
@media (prefers-reduced-motion: no-preference) {
  /* Animations here */
}
@media (orientation: portrait) {
  /* Styles for windows that are taller 
  than they are wide */
}
@media (orientation: landscape) {
  /* Styles for windows that are 
  wider than they are tall */
}
```

## Breakpoints

- We should put our breakpoints in dead zones, as far away from “real-world” resolutions as possible.
- They should be in “no-device land”. This way, all similar devices will share the same layout.
- `0-550px` — Mobile
- `550-1100px` — Tablet
- `1100-1500px` — Laptop
- `1500+px` — Desktop

```css
@media (min-width: 550px) {
  /* Tablets */
}
@media (min-width: 1100px) {
  /* Laptop */
}
@media (min-width: 1500px) {
  /* Desktop */
}
```

### Managing breakpoints

## Rem breakpoints

## CSS variables

- Aka `Custom properties`.
- Custom properties always start with two dashes `--`, to differentiate them from built-in properties.
- Function exactly like properties (like display, color, etc). We aren't setting a variable, we're creating a brand-new property.
- Custom properties are also inheritable, just like color or font-size.
- CSS variables are not global, but only available only to the element and its children.

## Disabling inheritance

- `@property` allows us to configure a specific variable.
- In this case, we're specifying that `--text-color` holds a color value that defaults to black, and that it doesn't inherit.

```css
@property --text-color {
  syntax: "<color>";
  inherits: false;
  initial-value: black;
}

main {
  --text-color: deeppink;
  color: var(--text-color);
}

section {
  color: var(--text-color);
}
```

## Default values

```css
/* If our .btn element or one of its ancestors 
   assigns a value to the --inner-spacing property, 
   that value will be used. Otherwise, it'll use a 
   fallback of 16px.
   */
.btn {
  padding: var(--inner-spacing, 16px);
}
```

## Reactive properties

- SASS and LESS variables don't ecxist at runtime, they are compiled away.
- CSS variables are reactive and exists at runtime.

## Responsive values and CSS variables

## Variable Fragments

- We can use CSS variables as pieces or fragments.
- Also, CSS variables are composable.

## Dark Mode

- You can use the `prefers-color-scheme` media query to create an alternative set of colors.
- Your colors should use the same values for `hue` and `saturation`, but should change the `lightness` values to be dark-mode appropriate.

## Calc in CSS

- For almost a decade now, CSS has had the ability to do math.
- it allows us to mix units.
- We can use 4 mathematical operators:

  - `+` (addition)
  - `-` (subtraction)
  - `*` (multiplication)
  - `/` (division)

```css
.something {
  width: calc(100px + 24px);
  height: calc(50px + 25px * 4);
}
```

## Viewport Units

## Scrollburglars

- A webpage has an accidental horizontal scrollbar that allows you to scroll by a few pixels.

- Following are the reasons for this:
  - An element has an explicit width that is too large to fit in the parent container.
  - A replaced element (eg. a video or an image) is used without constraining its width to fit in the parent container.
  - A really long word like “disestablishmentarianism” forces an element to be too wide for its parent container.
  - An element is explicitly pulled outside of the parent (positioned elements with negative left/right values, elements with negative margin, etc).

## Responsive Typography

- `Body text` is the text in our paragraphs and lists. It's the baseline text that fills most of our pages.
- `Body text` should stay the same size across all devices.
- body text should be at least 16px, what we're really saying is that it should be at least 1rem.
- `Smaller text`: smaller bits of text that annotate or label things. If the text is relatively unimportant (eg. copyright notices in the footer), It's ok if user has to pinch-to-zoom to read it. But if the content is important, we should bump it up on mobile so that it's easier to read.

- `Form fields`:

```css
/* We should not do this, It's a widely-accepted 
   convention that 1rem is equal to 16px. We're 
   just making things more complicated if we change 
   that convention. 
*/
html {
  font-size: 125%;
}
```

## Fluid design

- Responsive vs. fluid dynamic isn't just a typography thing.it's becoming increasingly common to use Flexbox/Grid to build `fluid layouts` instead of defining concrete breakpoints.
- That said, fluid isn't inherently better than responsive.

# 6: Typography and Images

## Text Rendering

## Kerning

- The ` letter placement`` is slightly different between browsers is that the browsers implement different  `kerning algorithms`.

- `Kerning`: Refers to the spacing between individual characters.

- We can disable kerning with `font-kerning: none`, but we aren't offered any fine-grained control.

- `letter-spacing`, allows us to increase/decrease the space between individual characters and acts as a _kerning multiplier_, it amplifies whatever kerning the browser decides on.

## Text Rasterization and anti-aliasing

- Why does our text look different across machines?
- Browser's OS affects how typography is rendered.
- Browser and the operating system play a role in the rasterization and anti-aliasing process. Different algorithms produce different results.

## Bitmap fonts

- Used in the very early days of computing.
- Fonts were essentially collections of images. Each character was represented by a single picture.
- A _font_ was a big repository of images, one for each character at each font size.

## Vector fonts

- In a vector font, we store a mathematical set of instructions for each character.
- The main benefit of vector font is that it can be scaled to any size without the letters becoming pixellated and blurry.
- For eg. ttf, otf, svg, and woff/woff2.

## Rasterization and Anti-aliasing

- In order to turn a vector font into characters on a screen, though, the browser has to figure out which color to make each pixel, a process known as `rasterization`.
- To make the text appear smoother, the browser can apply _anti-aliasing_.

## Font Smoothing

- `-webkit-font-smoothing`: This property allows us to switch `aliasing algorithm` the browser uses (for eg. subpixel-antialiased and antialiased).
- But, it only works on MacOS, and only in Chrome/Safari/Edge (not Firefox).
- Since MacOS Mojave, released in 2018, Apple has disabled subpixel antialiasing by default.
- Most displays are **high-DPI**. This means that every software pixel is being mapped onto multiple hardware pixels.
- `&nbsp;`: This is a non-breaking space character.

## HTML entities

- They're ways to embed **special characters** in HTML. For example, ` &gt;`` will produce the Greater Than symbol  `>`.

## Text Overflow

- The browser groups characters into "words". A word, in this case, is a collection of characters that can't be broken up.

- Words are separated by _breaking characters_ aka _soft wrap opportunities_. Each whitespace character is a soft wrap opportunity. So is the dash character `-`.

- `overflow-wrap: break-word;`: Using this we can line wrap long words. In IE, the property is called `word-wrap`.

## Hyphenation

- Use `hyphens: auto` to make the text automatically break on hyphens.

```css
p {
  overflow-wrap: break-word;
  hyphens: auto;
  /* Prefix for Safari */
  -webkit-hyphens: auto;
}
```

## Balanced text

## Ellipsis

- Using `text-overflow: ellipsis;`, we can trail off, leaving the sentence unfinished.
- We need `overflow: hidden` in order for text-overflow to work.

## Single-line ellipsis

## Multi-line ellipsis

- `-webkit-line-clamp`: Though it does require a couple of companion declarations

```css
p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin-bottom: 1em;
}
```

## Multi-line ellipsis

## Print-style Layouts

## Multi-Column Layout

- This layout mode that automatically split content across multiple columns, in a manner that allows the parent container to grow and shrink accordingly.

## Floats

- Floats allow text to "wrap around" an `embedded` element.
- Floats were a fundamental building block of the pre-Flexbox toolkit.
- In the late '00s / early '10s, floats were all the rage. They allowed us to build common UI elements like sidebars.

## Indentation

- To differentiate paragraphs, books generally use indentation.
- The first line of each paragraph is inset, and this is how our eyes can distinguish one paragraph from another.
- There isn't any additional space between them.

```css
p {
  text-indent: 2rem;
}
```

## Justified alignment

- `text-align: justify;`: the spacing between each word is tweaked so that each line fills the available horizontal space.

## Masonry Grid with Columns

## Text styling

## Line length

- `max-width: 50ch;`: Limits the line length to 50 characters.
- `1ch` is equal to the width of the 0 character, at the current font size.

## Text alignment

## Font Stacks

- The goal with a font stack is to provide a list of fonts that the browser can pick from, making sure that every user sees an acceptable font and nobody sees the (usually quite ugly) default serif browser font.

```css
.title {
  font-family: "Lato", Futura, Helvetica, Arial, sans-serif;
}
```

- The last font in the list should always be the _category_ for the font, like `serif`, `sans-serif`, `monospace`, or `cursive`.
- This ensures that if none of the other options are available, the browser will use its default font for that category.
- Fonts can be unavailable for two reasons:
  - The font isn't installed on the user's device.
  - The font is a web font, and it hasn't yet been downloaded.

## Web Fonts

- It is a font that doesn't come pre-installed on the user's device.
- Web fonts should be wrapped in quotes.
- This isn't strictly required if your web font is a single word, but it's a helpful convention: it indicates which fonts in the stack are web fonts vs. local fonts.

## Downside of Google fonts

- Lots of amazing fonts aren't available on Google Fonts.
- Self-hosted web fonts can perform better.

## Font Loading UX

## The font-display property

- It controls how a font should be rendered before it's available.
- `font-display: fallback|swap|block|optional;`

## Variable Fonts

```css
/* Get variable fonts from google */
<link rel="preconnect" href="https://fonts.gstatic.com">
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
>
```

# 7: CSS Grid

## Grid mental model

- Every cell in the same column needs to have the same width.
- The same is true for rows: every cell in the same row needs to have the same height.
- Rows/columns are invisible markers.
- The grid container itself is in flow layout. Only the children of grid container are affected.

## Intrinsic vs extrinsic sizing in CSS

- `Intrinsic sizing`: CSS engine considers the content for determining size (width/height etc). For eg. `min-content`, `max-content`, `fit-content` etc. The size is determined by the content and is **flexible** to adjust content.

- `Extrinsic sizing`: CSS engine does not consider the content for determining size (width/height etc). For eg. `20px`, `30%`, `4rem` etc. The content is squeezed to fit if required, CSS does not change size to fit content.

## Grid browser support

```css
.wrapper {
  display: flex;
}

@supports (display: grid) {
  .wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
```

## Grid Flow and Layout Modes

- `implicit grid`: When we don't specify the engine what the rows and columns should be, and it come up with its own grid, based on the number of children.
- By default each element in grid spans the entire width and height of its cell.
- By default we wind up with a single column and `n` rows, where `n` is the number of children.

## Grid auto flow

- We can change the flow direction for implicit grids with the `grid-auto-flow` property. The default value is `row`.
- When we change `grid-auto-flow` from `row` to `column`, we're not fundamentally changing the orientation of our grid, everything stays the same, except that our grid will have multiple columns instead of multiple rows.

## Grid vs Flexbox

- In Grid, there's no concept of `primary axis` or a `cross axis`.
- Instead, Grid has `rows` and `columns`. The rows are always arranged along the `block axis` ( In English and other horizontal languages, this is the vertical axis).
- Columns are always arranged along the `inline` axis ( In English and other horizontal languages, this is the horizontal axis).

## Grid construction

- We can explicitly define the grid by specifying the number of columns and/or rows.

- `grid-template-columns`: This property controls two things:
  - The number of columns we want our grid to have
  - The individual widths of each column
- The columns specified using `px`, `rems`, and `percentages` are all `hard limits`.
- The columns specified using `fr` are flexible and distributes the available space.

## Implicit rows

- Implicit rows are created automatically by grid engine to accomodate the children.
- The height of implicit row is the height of the tallest child in that row.
- The height of row grow and shrink as needed to accommodate the child element.

## Explicit rows

- Explicit rows have their heights specified.
- `grid-template-rows: 64px 1fr 100px;`: Specifies 3 rows.

## Placing children in grid

- Child elements are placed inside grid by specifying start and end lines.
- `Lines` start from `1` onwards.
- `Lines` are different from `tracks`.

```css
// First two columns
.item1 {
  grid-column-start: 1;
  grid-column-end: 3;
}

// First two columns, short hand
.item1 {
  grid-column: 1/3;
}

// Entire row, works only with explicit rows/columns
// defined with grid-template-columns/grid-template-rows
.item1 {
  grid-column: 1/-1;
}
```

## Out-of-bounds items

- If grid has more children than the rows specified, then the browser creates a new row and squeeze it in.

## Gaps

- `gap: 8px 0px;`: 8px between rows and 0px between columns.

## The “repeat” function

- Mostly used with `fr` units but we can use any unit like px and rem etc.

```css
.calendar {
  grid-template-columns: 250px 1fr 1fr 1fr 1fr 1fr;
}
.calendar {
  grid-template-columns: 250px repeat(5, 1fr);
}
```

## Grid alignment

- `justify-content`: start|end|center|stretch|space-around|space-between|space-evenly. Aligns the **grid columns**, `default` is `stretch`.
- `justify-items`: start|end|center|stretch. Aligns the **itme's** position in the grid cell along the inline (row/horizontal) axis, `default` is `stretch`.
- justify-content vs justify-items: Former applies to the **grid structure**, changing the columns. Latter applies to the **child elements**, without affecting the shape of the grid.
- `align-content`: start|end|center|stretch|space-around|space-between|space-evenly. Align the **rows** in a grid.
- `align-items`: start|end|center|stretch. Aligns the **item's** position along the block (column/vertical) axis within the row. `default` is `stretch`.
- `align-self`: start | end | center | stretch. Aligns a **single** grid item inside a cell along the block (column) axis.
- `justify-self`: start | end | center | stretch. Aligns a **single** grid item inside a cell along the inline (row) axis.

## What to use and when

- `Justify`: Align along `inline axis`.
- `Align`: Align along `block axis`.
- `Content`:
- `Items`: Align the item within a column.

## minmax function

- `minmax(50px, 1fr)`: Specifies the minimum and maximum widths of the grid columns. `fr` can't be used as minimum for obvious reason.

## auto-fill

- `repeat(autofull, 150px)`: Fill the grid with as many 150px-wide columns as possible. This wil leave empty space if the leftover space is less than 150px.

`repeat(auto-fill, minmax(150px, 1fr));`:

- Figure out how many columns we can fit at the minimum acceptable size, 150px.
- Scale up each column so that the entire horizontal space is filled

## auto-fill vs. auto-fit

- Suppose that we have space for 6 items, but we're only given 2 items. Should we create 4 extra empty columns, or should we stretch our two columns to be super wide, filling the available space?
- This is the fundamental difference between `auto-fill` (lots of empty columns) and `auto-fit` (stretched ultra-wide columns).

## Centering using grid

```css
.wrapper {
  display: grid;
  justify-content: center;
  align-content: center;
}

.wrapper {
  display: grid;
  place-content: center;
}
```

## Sticky grids

## Grid Quirks

### Margin collapse

- As in Flexbox, the margin on grid children won't collapse, in either direction.

### Z-index works with grid children

# 9: Animations

## Transform(translate)

- We can use `translate` to shift an element horizontaly or vertically.
- Positive values move down and right, negative values move up and left.
- Element's in-flow position doesn't change in any of the layout algorithms.
- percentage refers to the element's own size, instead of the available space in the parent container. We can mix percentages with other values in `calc` function.

```css
transform: translate(0px, 0px);
/* transform: translateY(20px);
   transform: translateX(20px); */
```

## Transform(scale)

```css
transform: scale(0.95);
transform: scale(1.55, 0.4);
```

## Transform(rotate)

```css
transform: rotate(122deg);
transform: rotate(0.5turn);
```

## Transform(skew)

```css
transform: skew(0deg);
transform: skewX(22deg);
```

## Transform (origin)

- Every element has an origin, the anchor that the transform functions execute from.
- The transform origin acts as a pivot point.

```css
transform: rotate(289deg);
/*
transform-origin: left top;
transform-origin: center;
transform-origin: 25px bottom;
transform-origin: 0% 150%;
*/
```

## Combining multiple operations

- We can combine multiple transforms with `translate`, `scale`, `rotate`, `skew` and `origin`. The order is important as it can lead to different results.
- The easiest fix is to switch it to use display: inline-block, or to use a different layout mode (eg. Flexbox or Grid).

## Inline Elements

- One common gotcha with transforms is that they don't work with `inline elements` in `Flow layout`.

## CSS Transitions

- Transition is highly configurable, but only two values are required:
  - The name of the property we wish to animate
  - The duration of the animation
- We can animate multiple properties, by passing a comma-separated list
- transition-property takes a special value: `all`. When all is specified, any CSS property that changes will be transitioned.

```css
.btn {
  transition: transform 250ms, opacity 400ms;
}

.btn:hover {
  transform: scale(1.2);
  opacity: 0;
}
```

## Timing functions

- There are several timing functions available to us in CSS.
- We can specify which one we want to use with the `transition-timing-function` property.

```css
.btn {
  transition: transform 250ms;
  transition-timing-function: linear;
  /* transition: transform 250ms linear; */
}
```

## Delays

- The transition starts after a delay if provided.

```css
.dropdown {
  opacity: 0;
  transition: opacity 400ms;
  transition-delay: 300ms;
  /* Shortcut
  transition: opacity 250ms 300ms; 
  */
}

.dropdown-wrapper:hover .dropdown {
  opacity: 1;
  transition: opacity 100ms;
  transition-delay: 0ms;
}
```

Note: Hover listeners should be attached to interactive elements as it is desirable to have the focus effect join the hover effect.

## Keyframe Animations

- Keyframe animations are declared using the `@keyframes` at-rule.
- We can specify a transition from one set of CSS declarations to another.
- Each `@keyframes` statement needs a `name`.
- Keyframe animations are meant to be general and reusable. We can apply them to specific selectors with the `animation` property. The `animation` property requires a duration just like `transistion` property.

```css
@keyframes slide-in {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0%);
  }
}
```

## Looped animations

- By default, keyframe animations will only run once, but we can control this with the `animation-iteration-count` property.

## Shorthand values for amimation property

- The order of the values doen't matter for most part.
- There is an exception: `animation-delay`, needs to come after the duration, since both properties take the same value type.

```css
.box {
  /*
  From this:
    animation: grow-and-shrink 2000ms;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-direction: alternate;

  ...to this:
  */
  animation: grow-and-shrink 2000ms ease-in-out infinite alternate;
}
```

## Fill Modes

```css
@keyframes slide-in {
  from {
    transform: translateX(-100%);
    opacity: 0.25;
  }
  to {
    transform: translateX(0%);
    opacity: 1;
  }
}

.box {
  animation: slide-in 1000ms;
  animation-delay: 500ms;
  animation-fill-mode: backwards;
}
```

- `animation-fill-mode`: forwards|backwards|both
- `animation-delay: 500ms;`: We can specify a delay just like `transition`.

## Dynamic Updates

## Animations vs. transitions

- There are some things that only @keyframes can do:
  - Looped animations
  - Multi-step animations
  - pauseable animations
- If an animation needs to run immediately when the page loads or the component mounts, it's easiest to use `@keyframes`.
- Use `transition` when CSS will change as a result of some application state or user action. Use it when you want to smooth out an otherwise harsh transition between values.

## keyframes and styled-components

## Animation performance

- In order for our brain to perceive motion as fluid and believable, it needs to run at 60 frames per second.
- This leaves us with only ~16 milliseconds to update each frame.
- Poor performance will often take the form of variable framerates.

## The pixel pipeline

- If we want to update the colors of the pixels on our screen, there's a pipeline of possible steps:

  - `Recalculating style` — first, we need to figure out which CSS declarations apply to which elements.
  - `Layout` — next, we need to figure out where each element sits on the page.
  - `Paint` — once we know where everything is, we can start painting them. This is the process of figuring out which color every pixel should be (“rasterization”), and filling it in.
  - `Compositing` — Finally, we can transform previously-painted elements.

- Compositing lets the browser re-use the work done in previous frames.
- It's best to try and avoid animating any properties that affect layout: this is things like `width`, `height`, `padding`, `margin`.

- There are only two properties that can be animated with compositing alone: `transform` and `opacity`.

## Action-Driven Animation

- We can improve a modal animation by differentiating between enter and exit actions.

## Orchestration

- We can improve that animation even more by sequencing it.

## Accessibility

## Motion vs. Animation

## 3D Transforms

- We can rotate an element in 3D space.
- `orthographic projection`: All objects drawn to the same scale.
- `perspective projection`: Mimics how things appear in real life, where things vanish into the distance.
- By default, the 3D engine in CSS will assume that we want to use `orthographic projection`.
- We can switch to a perspective projection using the `perspective` CSS property.
- We can choose a perspective value based on how attention-grabbing we want our animation to be.
- `perspective` property needs to be set on the parent element.

## Applying perspective

- There are two different ways to apply perspective.
  - First is with the `perspective` property.

```css
transform: rotateX(188deg);
perspective: 250px;
/* measure of how close the user
  is to the screen */
```

## The perspective function

- Unlike `perspective` property, the `perspective()` function will give each transformed element its own little environment.

## Rendering Contexts

`transform-style: preserve-3d`

# 9: Little Big Details

## CSS Filters

- CSS filters allow us to leverage the ridiculous power of SVG filters from within CSS, wrapped up in a declarative, straightforward way.
- They are applied mostly to `img` tag but work with any DOM node.

## Color Manipulation using filters

```css
filter: brightness(150%);
filter: contrast(60%);
filter: sepia(100%);
filter: contrast(200%) grayscale(90%);
```

## Hue rotation

- It shifts the color of every pixel in the element.
- `hue-rotate(60deg)`.

## Blur Filter

- It applies a Gaussian blur to the selected element.
- We can apply `transition` to `filter` for more effect.
- Blurring can be a very expensive operation, so apply with caution.
- The blur filter leads to a soft, blurred edge. If you'd prefer a sharper edge, you can add `overflow: hidden` to the parent container.

## Backdrop Filters

- Applies to background behind the element.
- `backdrop-filter: blur(10px);`
- Can be used to obfuscate the content behind the sticky header.

## Border Radius

- Setting border-radius to `50%` converts element into ellipse.

## Nested radius

## Circular radius

## Shadows

- There are three main ways to apply shadows in CSS:
  1. **box-shadow**
  2. **text-shadow**
  3. **filter: drop-shadow**

## Box shadow

- box-shadow is most commonly called with 4 arguments
  - Horizontal offset
  - Vertical offset
  - Blur radius
  - Color

## filter: drop-shadow

- The effect is similar to `box-shadow`, but it uses slightly different algorithm.
- It produces a softer, more-blended shadow than `box-shadow`.

## text-shadow

- `text-shadow` applies only to the typography within the selected element.
- One of the most common use cases for text-shadow is to increase the contrast between light-coloured text and a light background.

## Contoured Shadows

- If we `use filter: drop-shadow` on an image that supports transparency (eg. png, gif, svg), the shadow will apply to the non-transparent parts of the image. It **doesn't form a rectangle** around the layer itself.
- When we apply filter: drop-shadow to an element, it contours that element and all of its **descendants**.
- We can even apply filter: drop-shadow to a group of elements, to make sure we don't have any **shadow overlap** unlike `box-shadow`.
- Sometimes, `filter: drop-shadow` produces some really funky effects in Safari.

## Single-Sided Shadows

- Using `box-shadow` we can create single sided shadows.
- `drop-shadow` filter function cannot do this as it does not take `spread` argument.

## Inset shadows

- Inset shadows allow us to create the illusion that an element is lower than its surrounding environment.
- We can achieve this by using `box-shadow` property with `inset` keyword`.

# `%!&^*#$%#^*#(*#_(#)_)(#) !(*&#*(&`

# `^*&@^*&^#*&)*#&()#&(&#(*&_(#())))`

## Replaced elements

- They're elements whose contents are not affected by the current document's styles.
- The position of the replaced element can be affected using CSS, but not the contents of the replaced element itself.
- Examples of replaced elements are img, iframe, video, embed.

**Note**:

- We can use `html` and `:root` interchangeably. It makes no difference.

- `:root` refers to the top-level element in the DOM. In a properly-formed HTML document, this is always the `html` tag. And so `:root` is essentially an alias for html.
- I prefer to use html because it feels like a pointless abstraction to me, but ultimately it's all the same thing.

# Check

- Specify height in a container with min-height 100%.
- Check if absolute positioned element is inline-block.
- How to focus in storybook: document.querySelector(".sc-gKsewC fRZqK").focus();
- Why color is not inherited in TextInput but inherited in Iconwrapper and Icon.
