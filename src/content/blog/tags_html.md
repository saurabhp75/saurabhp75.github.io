---
title: "HTML and CSS"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["HTML", "CSS", "Flexbox", "Grid"]
draft: false
description: "Introduction to HTML"
---

`<!DOCTYPE html>` : Tells browser that it is an `HTML 5` document.

## Most common tags

- `header`: Header tag. Different from `head` tag in html.
- `footer`: Contains information about the page, such as copyright information.
- `div`: A generic tag that can be used to group elements.
- `ul`: Unordered list.
- `ol`: Ordered list.
- `li`: List item.
- `nav`: Navigation bar.
- `main`: Main content.
- `section`: Section of the page.

# block vs inline elements

## Block elements features

- The box will break onto a new line. They have their own row and stack on top of each other.
- The `width` and `height` properties are respected/available.
- `Padding`, `margin` and `border` will cause other elements to be pushed away from the box.
- In most cases, the box will become as wide as its container, filling up 100% of the space available.

### **Note**:

- The height of block level elements should not be specified. That is, they should have height of 0 for responsive design. In this case the height grows to match the content.
- Most elements are block level elements by default.
- The `display` property determines whether the element is `block`, `inline`, `flex`, `inline-block` etc.
- `display: block|inline;` sets the `outer display` type of the element.
- `display: flex|inline-flex;` sets the `inner display` type of the element.

## Inline elements features

- The box will not break onto a new line.
- The `width` and `height` properties will not apply (not available).
- Vertical padding, margins, and borders will apply but will not cause other inline boxes to move away from the box.
- Horizontal padding, margins, and borders will apply and will cause other inline boxes to move away from the box.

## Inline-block elements

- An element set to inline-block is very similar to inline in that it will set inline with the natural flow of text (on the “baseline”). The difference is that you are able to set a `width` and `height` which will be respected.

## CSS box model

- Browser renders each element as a box.
- CSS properties determines the size, position and other properties (color, background, border size, etc) of these boxes.
- `box-sizing: border-box;`: The rendered size of the element will be same as specified width and height.
- `box-sizing: content-box;`: The rendered size of the element will be sum of content width|height plus padding and border.

## margin vs padding

- Margin adds empty space around the element.
- Padding adds the background around the content of element.

## margin

- We can individually control the margin, for eg `margin-left`, `margin-right`, `margin-top` etc.
- Mostly short forms are used.

```css
/* margin can have upto 4 attributes and has long & short forms */

margin: 1em|-3px; /* Apply to all four sides */
margin: 2px 1em 0 auto; /* top | right | bottom | left */
margin: 5% auto; /* vertical, horizontal */
margin: 1em auto 2em; /* top | horizontal | bottom */
```

## Padding

- Controls the positioning of content inside the element.
- We can individually control the padding, for eg `padding-left`, `padding-right`, `padding-top` etc.
- Mostly short forms are used.
- Works just like margin in terms of long and short form syntax.

## Centering the element

- Horizontal centering: `margin: 0, auto;`. This requires that the element width is specified.
- Vertical margin set to auto means 0 margin, it may not center the element vertically.

## Borders

- Similar to "stroke" in vector software.
- It has 3 properties viz, `border-width`, `border-style`, `border-color`.
- Short form (order doesn't matter): `border: border-width, border-style, border-color;`
- If we omit color in the shorthand form, it defaults to text color.
- We can individually control the border, for eg `border-left`, `border-right`, `border-top etc`.
- border-[top|bottom|left|right]-[width|style|color].
- Border will be invisible if its style is not defined. This is because the style defaults to none.

## border-color

```css
/* Works just like margin & padding in terms of long and short form syntax. */
border-color: red; /* All sides */
border-color: red #32a1ce; /* Vertical and horizontal */
border-color: red rgba(170, 50, 220, 0.6) green; /* Top horizontal and bottom */
border-color: red yellow green transparent; /* top | right | bottom | left */
```

## border-style

```css
/* Works just like margin & padding in terms of long and short form syntax. */
border-style: none;
border-style: dotted;
border-style: inset;
border-style: dashed solid;
border-style: dashed double none;
border-style: dashed double none;
```

## border-width

```css
/* Works just like margin & padding in terms of long and short form syntax. */
border-width: thick;
border-width: 1em;
border-width: 4px 1.25em;
border-width: 2ex 1.25ex 0.5ex;
border-width: 0 4px 8px 12px;
```

# Building responsive UI (CSS)

## Day1, using percentages and avoiding heights

- Websites are responsive by default. So if it's not working, we have specified something in CSS which has made it so.

- For block elements, use percentage for width as it is responsive by default.
- If we specify a value (other than percentage) for width, then we have to use media queries manually to center the element for different devices.
- Specifying width can also be avoided in certain contexts.
- If the specified width of a block element is more than the device/viewport width, then it will show scroll window.
- Avoid specifying height of a block level element. As it may cause the content to overflow in very narrow viewport.

**Note**: By default, the `font-size` in a browser is 16px.

### Why we should never specify the height of a block level element:

- When height of a block element is specified the content can overflow the element, if the content is large.
- Also the next element will not be spaced from the overflowing content but by the container element itself.

### Responsive layouts

- The width should be in percentage of the parent element.
- DON'T specify the height of an element, use padding instead.
- For `padding` and `font-size`, use `em`.
- For other attributes use `rem`.

## Day2, getting familiar with relative units

### em vs rem

### em

- For `font-size`, `em` is the font-size of the parent element.
- For other attributes like `margin`, `padding`, `width` and `height` etc, `em` is the `font-size` of the element itself.
- It is used for elements internal consistency of the element like `padding` and `font-size`.
- It can be used for `button` where the `padding` changes with the `font-size`.
- You should not set `font-size` using `em`, but use `rem` instead. This avoids the issue of compounding in nested elements.

```css
btn {
  /* 2.5 times the font-size of the parent element. */
  font-size: 2.5em;
  /* 2 times the font-size of current element, 
  ie. 5 times the size of parent element. */
  margin: 2em;
}
```

### rem

- It is the `font-size` of the root element(html).
- It is same for `font-size` and other attributes like `padding`, `margin` etc.
- It is used for elements external consistency of the element like `margin`.

**Note**: If a `font-size` of an element is not defined, it is searched in the parent and so on.

## Day3, max-width

\_ We should set `max-width` of an element to avoid stretching for big screen-size.

- box-sizing
- margin
- padding
- border
- background
- font-size
- font-weight
- text-align
- background
- color
- height
- width
- display

## Gradients

Gradients are implemented as image, so we need to tweak the background image property.

```css
/* teo colors, start from top(default) */
background-image: linear-gradient(red, blue);

/* Start from right to left */
background-image: linear-gradient(to left, red, blue);

/* Start from bottom left to top right*/
background-image: linear-gradient(to right top, red, blue);

/* This is same as the above */
background-image: linear-gradient(45 deg, red, blue);

/* Striped pattern */
background-image: linear-gradient(
  to left,
  red 10%,
  blue 10%,
  blue 20%,
  red 20%
);

/* Start transition from 10% height */
background-image: linear-gradient(red 10%, blue);
background-image: linear-gradient(red 100px, blue);

/* Use four colors for transition */
background-image: linear-gradient(red, pink, orange, blue);

/*  */
background-image: radial-gradient(red, blue);

background-image: radial-gradient(red 50%, blue);

/* Sharp boundaries */
background-image: radial-gradient(red 30%, blue 30%, blue);

/* Concentric circles pattern */
background-image: radial-gradient(
  to left,
  red 10%,
  blue 10%,
  blue 20%,
  red 20%
);

/* Repeating circles */
backrgound-image: repeating-radial-gradient(
  red,
  red 10px,
  blue 10px,
  blue 20px
);

/* Repeating lines */
backrgound-image: repeating-linear-gradient(
  red,
  red 10px,
  blue 10px,
  blue 20px
);
```

## Why we use HSL colors

- Easier to guess just by looking at them.
- Easy for designer to tweak colors.

### Semantic markup

- Meaningful tags instead of div.
- For eg. `header`, `section`, `nav`, `footer` etc.

### Opening and closing tags

- Example of Opening and closing tags: `<h1></h1>`
- Example of Single opening and closing tag: `<br/>`

### paragraph (p)

- Used to organize text. images etc.
- Block level element.

### headings tag (h1, h2..)

- Only one H1 on a page.
- Not to be used for sizing the text. Use CSS for that.
- No H2 should exist without H1 and so on.

### List

- Numbered/ordered (ol) and bulletted/unordered (ul).
- Both have `li` as list items.

### anchor tags (a)

- They are inline elements. Don't take a new line.
- Has `href` attribute which has the url.

### Image tag (img)

- There are no opening and closing tags, just one tag.
- Has `src` and `alt` attribute.

### fieldset

- Used in forms to group related inputs.
- Nested legend tag provides the caption to the group.

```html
<form>
  <fieldset>
    <legend>Choose your favorite monster</legend>

    <input type="radio" id="kraken" name="monster" />
    <label for="kraken">Kraken</label><br />

    <input type="radio" id="sasquatch" name="monster" />
    <label for="sasquatch">Sasquatch</label><br />
  </fieldset>
</form>
```

### Odd tags

- `hr`: horizontal ruler.
- `br`: line break
- `sup`: superscript
- `sub`: subscript

### HTML entity codes

- Start with ampersand and end with semicolon.
- Used to display reserved chars which would normally be invalid.
- Also used for difficult to type chars.
- Browser interpret and render the correct char instead.

### input tag

- Has `type` attribute which changes the functionality.
- eg of type are `text`, `password`, `color`, `number`, `time` etc.
- For text input and some others we have `placeholder` attribute.
- `label` tag used to connect inputs using id attribute using `for` attribute.
- `label` has `for` attribute which is linked to `id` attribute in input. It's used by screen readers.
- `name` attribute for input tag is used to send value to the action URL. Can be seen in address bar.
- The `value` attribute in input tag specifies the value of an input element.

```html
<form method="post" action="/projects/new">
  <p>
    <label> Name: <input name="name" type="text" /> </label>
  </p>
  <p>
    <label>
      Description:
      <br />
      <textarea name="description" />
    </label>
  </p>
  <p>
    <button type="submit">Create</button>
  </p>
</form>
```

### HTML form

- Contains interactive controls for submitting information.
- `action` attribute specifies where the form data should be sent.
- `method` attribute specifies which http method should be used.
- When we click a button in the form, it will by default submit the form.
- This happens because by default the type of the button in form is `submit`.
- We can change the above behaviour by explicitly changing the `type` of button to `button` or by using JS and event handler.

### comments

### HTML Table

- Table is defined with `<table>` tag.
- Each row in table is defined with `<tr>` tag.
- The row elements in table are defined with `<td>` under `<tr>`.
- The header elements in table header are defined with `<th>` under `<tr>`.

# CSS

[CSS variables ](https://kentcdodds.com/blog/super-simple-start-to-css-variables)

Properties should be seperated by a semicolon `;`

### Three ways to add CSS

- inline: style ="color: red"
- Using style tag in HTML file head: `&lt;style&gt; h2 {color: red}&lt;/style&gt;`
- CSS file:`h2 {color: red}`

[**Colors site**](https://coolors.co)

### CSS properties

- `color`: rgb(23, 122, 211); Text color
- `background-color`: Background color
- `background`: more powerful, you can add images also.

### Color representation:

- `Name`: Name of color for eg. red, rellow and pink etc.
- `RGB`: for eg. `rgb(5,7,8)`, each no. is between 0-255.
- `Hex`: starts with `#` followed by 6 hexadecimal digits.

### Common text properties

- `text-align`: right/center/left
- `font-weight`: normal(400)/light/bold(700)(er)
- `100-900`: it's not available for all fonts.
- `text-decoration`: [color] under/overline/line-through [wavy/dotted]
- `line-height`:
- `letter-spacing`:
- `font-size`:
- `font-family`: Starts with Capital letter. Concept of font stack. Concept of font-family for eg sans-serif.

**Note**: order matters, the latest style is applied. Also while linking css files the last file has the final say.

### CSS Specificity:

Id>class>elements
Inline style and ! important.

### CSS inheritance:

- Not all elements inherit: for eg button and input.
- Not all properties are inheritable.

## CSS box model

- Everything in css is a box.
- Padding: Between `content box` and border.
- Border:
- Margin: Between border and border.
- When we specify width or height of an element, it is width of the content.
- The total width of the element also includes, padding, border and margin.

**Note**:

- Width and height properties controls the `content box`.
- background-color is for the content box and not the whole box of the element. We can change this using "box-sizing: border-box;".

### Border properties

- Border-[left|right|top|bottom]-width,
- border-color,
- border-style: solid, dotted etc.

### Shorthand for border properties:

- border: width color style;
- border-radius: 20%;

### Padding and margin properties

- padding\[-left\|right\|top\|bottom\]
- We can use auto if we want to postion in middle
- For eg padding: auto or,
- padding: auto 5px, centre the eement vertically and keep horizontal margins 5px.

### Shorthand for padding properties

- padding: 10px; all sides
- padding: 10px; 20px; top-bottom and left-right
- padding: 10px 10px 20px 15px; top right bottom left.

## display property

- `display: inline`: width and height of the element are ignored, margin and padding are respected only in horizontal direction.
- `display: block`: width, height, margin and padding of the element are respected.
- `display: inline-block`: Element is nline but width, height, margin and padding are respected.

## CSS units

- percentages

  - Could be percentage of the parent or the element itself.
  - for eg. `width: 50%;` is half the width of parent.
  - `line-height: 50%`: is half the font size of the element.

- `em`:

  - For font size property, it is relative to the parent's font size.
  - With other properties it is relative to the calcualted font size of the element itself.
  - Good for properties like radius.

- `rem`:
  - Related to the font size of the root element, ie HTML.
  - Its better than em in certain cases.

## Position

- `position`: static|relative|absolute|fixed|sticky.
- `static`: Default position. The element is part of `document flow`.
- `relative`: Same as `static`, but lets you add `top`, `right`, `bottom`, `left`, which makes the element position relative to it's normal/static postion, which is not used very often. Position of other elements is not changed as the element is not taken out of `document flow`. Other use case of `relative` is that the child elements are placed relative to this element.
- `absolute`: Removes the element from the `document flow` (Other elements are positioned as if this element is absent) and positions wrt to the nearest parent with `position` other than `static`. Else it considers the main html element as the parent.
- `fixed`: Similar to `absolute` except that it is always placed relative to top html element. Fixed to a place. Stays(fixed wrt viewport) there when scrolled.
- `sticky`: Relative(when normal) + fixed(when scrolled). The values for top, right, bottom, left. Becomes active when scrolled.

## CSS transition

- Simple usage: `transition: 1s/ms;`
- Used to set transition time of element, in case it's properties changes, for eg due to hover.

### Complex transition usage:

- `transition: property-name duration transition-function delay;`
- Transition function: `ease`, `ease-in`, `ease-out`, `linear`, `step-start`, `step-end`.

## Transform property

- Transform to parent also applies to children.
- Usage: `transform rotate(45deg);`
- `transform-origin`: top|bottom|bottom-right.
- `transform scale(45deg);`
- `transform translate[X|Y](20px);`

## background property

- It has lot of options.
- background-image: url(../media/test.jpg);
- background-size: contain|cover|auto|repeat. If usign shorthand, it must be placed after position following a /.
- for eg. background: no-repeat center/80% url(../media/tree.jpg);
- background-position: top|left|center.
- shorthand: `background: no-repeat center/80% url(../media/tree.jpg);`

## Google fonts

- Google has lots of font families for free. We can include them.
- [Link to google fonts](https://fonts.google.com/).

# Flexbox

Provides a more efficient way to lay out, align and distribute space among `items` in a `container`, even when their size is unknown and/or dynamic.
The main idea behind the flex layout is to give the container the ability to alter its items’ width/height (and order) to best fill the available space (mostly to accommodate to all kind of display devices and screen sizes).

- Used to arrange block elements in columns. on a page.
- When we set `display: flex`, all children become columns.

## flex model

- Concept of `main axis` and `cross axis`.
- By default `main axis` goes from left to right and `cross axis` is top to bottom by default.

## flexbox container properties

- `display: flex|inline-flex;`: Defines a flex container.
- `flex-direction: row | row-reverse | column | column-reverse;`: Controls the main axis. Default is `row`.
- `flex-wrap: nowrap|wrap|wrap-reverse`: The content will not shrink to fit but wrap. Changes/controls the `cross-axis`.
  - `nowrap`(default): all flex items will be on one line.
  - `wrap`(default)`: flex items will wrap onto multiple lines, from top to bottom.
  - `wrap-reverse`: flex items will wrap onto multiple lines from bottom to top.
- `flex-flow`: Shorthand for the `flex-direction` and `flex-wrap properties`. For eg. `flex-flow: column wrap;`.
- `justify-content`: flex-start, flex-end, center, space-between, space-around, space-evenly. along the main axis.
- `align-items: stretch|flex-start|flex-end|center|baseline`: Distribute elements along `cross axis`.
- `align-content: flex-start | flex-end | center | space-between | space-around | space-evenly | stretch | start | end | baseline;`: Distribute content along cross axis, ie space between rows/columns, but only if we have multiple rows/columns and flex-wrap is enabled.
- `row-gap, column-gap`: Controls space between flex items. It applies to spacing ONLY between the items and not outer edges. The behavior could be thought of as a minimum gutter as it only takes effect if the space between items is smaller.
- `gap`: Shorthand for row-gap and column-gap.

## flexbox item properties

- `order`: Defines the sequence of item in container, default is as specified in source.
- `flex-grow`: Its an unitless number. defines the ability for a flex item to grow if necessary. Default is 0 (no grow).
- `flex-basis 200px`: Defines the default/initial size of an element across the main axis, before additional space is distributed. The default is `auto`. It is almost same as width.
- `flex-shrink`: Its an unitless number. Defines the ability for a flex item to shrink if necessary. Default is 1 (shrink enabled).
- `flex`: This is the shorthand for `flex-grow`, `flex-shrink` and `flex-basis` combined. The default is `0 1 auto`, but if you set it with a single number value, like `flex: 5;`, that changes the flex-basis to 0%, so it’s like setting flex-grow: 5; flex-shrink: 1; flex-basis: 0%;.
- `align-self: auto | flex-start | flex-end | center | baseline | stretch;` Similar to `align-items` but it applies to single item.
- Flexbox can push things away: It’s a rather unique feature of flexbox that you can, for example, put margin-right: auto; on an element and, if there is room, that element will push everything else as far away as it can go can.

**Note**: `flex-grow:2;` does not mean that the element will be double the width of element with `flex-grow: 1;`. Same holds true for `flex-shrink` property. It’s their rate of shrinking and growing and not the final rendered size.

# CSS Grid

## Flexbox vs grid

- Flexbox can optionally wrap: This gives them a masonary like look.
- Flexbox is one dimensional.
- Grid is one dimensional: This give sthem a grid-like look.
- Grid is mostly defined on the parent element. In flexbox, most of the layout (beyond the very basics) happen on the children.
- Grid is better at overlapping.
- Grid is sturdier

## Grid terminology

- `Grid Container`: The element on which `display: grid` is applied. It’s the `direct parent` of all the grid items.
- `Grid Item`: The children (i.e. `direct descendants`) of the grid container.
- `Grid Line`: The dividing lines that make up the structure of the grid. They can be either vertical (“column grid lines”) or horizontal (“row grid lines”) and reside on either side of a row or column.
- `Grid Cell`: The space between two adjacent row and two adjacent column grid lines. It’s a single “unit” of the grid.
- `Grid Track`: The space between two adjacent grid lines. You can think of them as the columns or rows of the grid.
- `Grid Area`: The total space surrounded by four grid lines. A grid area may be composed of any number of grid cells.

## Properties for the Parent(Grid Container)

- `display grid|inline-grid`: Generates a block-level/inline-level grid
- `grid-template-columns/grid-template-rows`: Defines the columns and rows of the grid with a space-separated list of values. The values represent the track size, and the space between them represents the grid line. Grid lines are automatically assigned positive numbers from these assignments (-1 being an alternate for the very last row). You can explicitly name the lines.

```css
.container {
  grid-template-columns: ... ...;
  /* e.g. 
      1fr 1fr
      minmax(10px, 1fr) 3fr
      repeat(5, 1fr)
      50px auto 100px 1fr
  */
  grid-template-rows: ... ...;
  /* e.g. 
      min-content 1fr min-content
      100px 1fr max-content
  */
}

.container {
  grid-template-columns: [first] 40px [line2] 50px [line3] auto [col4-start] 50px [five] 40px [end];
  grid-template-rows: [row1-start] 25% [row1-end] 100px [third-line] auto [last-line];
}
```

- `grid-template-areas`:

- `grid-template`:
- `column-gap|row-gap|grid-column-gap|grid-row-gap`:
- `gap|grid-gap`:
- `justify-items`:
- `align-items`:
- `place-items`:
- `justify-content`:
- `align-content`:
- `place-content`:
- `grid-auto-columns|grid-auto-rows`:
- `grid-auto-flow`:
- `grid`:

## Properties for the Children(Grid Items)

- `grid-column-start|grid-column-end|grid-row-start|grid-row-end`:
- `grid-column|grid-row`:
- `grid-area`:
- `justify-self`:
- `align-self`:
- `place-self`:

## Special Units & Functions

- `fr` units:

## Sizing Keywords

- `min-content`:
- `max-content`:
- `auto`:
- `fit-content`:

## Sizing Functions

- `minmax()`:
- `min()`:
- `The max()`:

## Responsive design and media queries

- For eg. `@media screen and (min-width: 30em) and (orientation: landscape) { ... }`

## Media queries

- Width
- Height
- Orientation
- Device viz. screen, print, all etc.

### Viewport

- `min-width`: minimum of npx and above.
- `max-width`: maximum of npx and below.

- `CSS reset`: A CSS script to reset the default css of a browser.

## CSS Grid

Grid terminology

- Grid Container: The element on which `display: grid` is applied.
- `Grid Item`: The children (i.e. direct descendants) of the grid container.
- `Grid Line`: The dividing lines (vertical and horizontal) that make up the structure of the grid.
- `Grid Cell`: The space between two adjacent row and two adjacent column grid lines. It’s a single “unit” of the grid.
- `Grid Track`: The space between two adjacent grid lines. You can think of them as the columns or rows of the grid.
- `Grid Area`: The total space surrounded by four grid lines. A grid area may be composed of any number of grid cells.

## Grid properties

## Properties for the Parent (Grid Container)

### display

```css
.container {
  display: grid | inline-grid;
}
```

### grid-template-columns and grid-template-rows

```css
.container {
  grid-template-columns: ... ...;
  /* e.g. 
      1fr 1fr
      minmax(10px, 1fr) 3fr
      repeat(5, 1fr)
      50px auto 100px 1fr
  */
  grid-template-rows: ... ...;
  /* e.g. 
      min-content 1fr min-content
      100px 1fr max-content
  */
}

/* you can choose to explicitly name the lines. Note the
   bracket syntax for the line names:*/
.container {
  grid-template-columns: [first] 40px [line2] 50px [line3] auto [col4-start] 50px [five] 40px [end];
  grid-template-rows: [row1-start] 25% [row1-end] 100px [third-line] auto [last-line];
}

/* A line can have more than one name */
.container {
  grid-template-rows: [row1-start] 25% [row1-end row2-start] 25% [row2-end];
}

/* repeat() notation for repeating parts */
.container {
  grid-template-columns: repeat(3, 20px [col-start]);
}

/* This is same as above */
.container {
  grid-template-columns: 20px [col-start] 20px [col-start] 20px [col-start];
}

/* If multiple lines share the same name, they can be referenced
   by their line name and count. */
.item {
  grid-column-start: col-start 2;
}

/* The free space is calculated after any non-flexible items*/
.container {
  grid-template-columns: 1fr 50px 1fr 1fr;
}
```

### grid-template-areas

/_ syntax _/

```css
/* <grid-area-name> is grid-area property of grid-item */
.container {
  grid-template-areas:
    "<grid-area-name> | . | none | ..."
    "...";
}

/* example: Each row in your declaration needs to have the 
   same number of cells. */
.container {
  display: grid;
  grid-template-columns: 50px 50px 50px 50px;
  grid-template-rows: auto;
  grid-template-areas:
    "header header header header"
    "main main . sidebar"
    "footer footer footer footer";
}
```

### grid-template

- A shorthand for setting grid-template-rows, grid-template-columns, and grid-template-areas in a single declaration.

```css
/*  
  none – sets all three properties to their initial values
  <grid-template-rows> / <grid-template-columns> – sets grid-template-columns 
  and grid-template-rows to the specified values, respectively, and sets 
  grid-template-areas to none
*/

.container {
  grid-template: none | <grid-template-rows> / <grid-template-columns>;
}
```

### column-gap/row-gap and grid-column-gap/grid-row-gap

- Specifies the size of the grid lines. You can think of it like setting the width of the gutters between the columns/rows.
- The gutters/gap are only created between the columns/rows, not on the outer edges.
- column-gap/row-gap is the newer syntax.

### grid-gap

- A shorthand for row-gap and column-gap.

```css
/* syntax */
.container {
  /* standard */
  gap: <grid-row-gap> <grid-column-gap>;

  /* old */
  grid-gap: <grid-row-gap> <grid-column-gap>;
}

/* Example */
.container {
  grid-template-columns: 100px 50px 100px;
  grid-template-rows: 80px auto 80px;
  gap: 15px 10px;
}
```

## CSS selectors

1. `Element type(‘p’ )`: Select all paragraph elements

2. `Element ID(‘#25’)`: Select all elements with id=25

3. `Element Class('.text')`: Select all elements with class=text

4. `Descendant combinator(‘ ‘ or ‘-’)`: eg. `div p` , Select all paragraph elements (descendants) under div elements

5. `Child combinator(‘div>p’ )`: Select all paragraph elements whose immediate parent is div. For eg. `ul > li` will match all `<li>` elements that are nested directly inside a `<ul>` element

6. `Attribute(‘div[attr]’ )`: Select all div elements having ‘attr’ attribute)

7. `Attribute value(‘div[attr=val]’)`: Select all div elements with attr value equal to ‘val’

8. `Universal selector ‘*’` : Matches any type, usually ommited, eg. `*.text` and `.text` are same.

9. `[attr~=value]`: Elements with an attribute name of attr whose value is a whitespace-separated list of words, one of which is exactly value.

10. `[attr\|=value]`: Represents elements with an attribute name of attr whose value can be exactly value or can begin with value immediately followed by a hyphen, \- \(U+002D). It is often used for language subcode matches.

11. `[attr^=value]`: Represents elements with an attribute name of attr whose value is prefixed (preceded) by value.

12. `[attr$=value]`: Represents elements with an attribute name of attr whose value is suffixed (followed) by value.

13. `[attr\*=value]`: Represents elements with an attribute name of attr whose value contains at least one occurrence of value within the string.

14. `[attr operator value I]`: Adding an i (or I) before the closing bracket causes the value to be compared case-insensitively (for characters within the ASCII range).

15. `Adjacent sibling combinator(+)`: eg. ‘img + p’, matches the second element only if it **immediately** follows the first element, and both are children of the same parent element.

16. `General sibling combinator(~)`: eg. ‘img ~ p’, separates two selectors and matches the second element only if it follows the first element (though not necessarily immediately), and both are children of the same parent element.

17. `Psuedo classes(‘:’)`: pseudo-class is a keyword added to a selector that specifies a special state of the selected element(s). eg. div:hover, a:visited, :checked

    - `:active`: clicked
    - `:checked`
    - `:first`
    - `:first-child`
    - `:hover`
    - `:not()`
    - `:nth-child()`
    - `:nth-of-type(2n)`
    - `:first-of-type`

18. `Psuedo elements(‘:’ or ‘::’)`: pseudo-element is a keyword added to a selector that lets you style a specific part of the selected element(s). For eg., `::first-line` can be used to change the font of the first line of a paragraph. eg.

    - `::after`
    - `::before`
    - `::cue`
    - `::first-letter`
    - `::first-line`
    - `::selection`
    - `::slotted`
    - `::backdrop`
    - `::placeholder`
    - `::marker`
    - `::spelling-error`
    - `::grammar-error`

19. To extract `attribute(‘::attr(attributename)’)`: Can be used to extract `href` from anchor tag(a).

20. `List of selectors`: Comma seperated list of selectors for eg, `div, span` will select all divs and spans.

# XPATH

**Absolute Xpath** : Begins with `/`  
**Relative Xpath** : Begins with `//`

- `//input[@name='uid']`: based on name attribute
- `//input[@type='text']`: based on type of element
- `//label[@id='message23']`: based on id of element
- `//input[@value='RESET']`: based on value attribute
- `//\*[@class='barone']`: based on class
- `//a[@href='http://demo.guru99.com/']`: based on href attribute
- `//img[@src='//cdn.guru99.com/images/home/java.png']`: based on source attribute

- `//\*[contains(@type,'sub')]`
- `//\*[contains(@name,'btn')]`
- `//\*[contains(@id,'message')]`
- `//\*[contains(text(),'here')]`
- `//\*[contains(@href,'guru99.com')]`
- `//\*[@type='submit' OR @name='btnReset']`
- `//input[@type='submit' AND @name='btnLogin']`
- `//label[starts-with(@id,'message')]`
- `//td[text()='UserID']`

- `//label[starts-with(@id,'message')]`
- `//td[text()='UserID']``

## xpath axes methods

- //\*[@type='text']//following::input
- //\*[text()='Enterprise Testing']//ancestor::div : selects all ancestors parents, grandparents etc
- //\*[text()='Enterprise Testing']//ancestor::div[1] : selects first ancestor
- //\*[@id='java_technologies']/child::li : select all child nodes
- //\*[@id='java_technologies']/child::li[1] : selects first child node
- //\*[@type='submit']//preceding::input
- //\*[@type='submit']//following-sibling::input
- //\*[@id='rt-feature']//parent::div
- //\*[@type='password']//self::input
- //\*[@id='rt-feature']//descendant::a
