---
layout: single
title: "HTML Tags"
excerpt: "Intro to HTML Tags"
---

### Semantic markup

- Meaningful tags instead of div.
- For eg. `header`, `section`, `nav`, `footer` etc.

### block vs inline elements

- Block elements have their own row.
- For `span` is inline and `div` is block level element.

### Opening and closing tags

- Example of Opening and closing tags: <h1></h1>
- Example of Single opening and closing tag: <br/>

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
- `label` has `for` attribute which is linked to id attribute in input. It's used by screen readers.
- `name` attribute for input tag is used to send value to the action URL. Can be seen in address bar.
- The `value` attribute in input tag specifies the value of an input element

### HTML form

- Contains interactive controls for submitting information.
- `action` attribute specifis where the form data should be sent.
- `method` attribute specifies which http method should be used.
- When we click a button in the form, it will by default submit the form.
- This happens because by default the type of the button in form is `submit`.
- We can change the above behaviour by explicitly changing the `type` of button to `button` or by using JS and event handler.

### comments

### HTML Table

- Table is defined with <table> tag.
- Each row in table is defined with <tr> tag.
- The row elements in table are defined with <td> under <tr>.
- The header elements in table header are defined with <th> under <tr>.

# CSS

Properties should be seperated by semicolon;

### Three ways to add CSS

- inline: style ="color: red"
- Using style tag in HTML file: &lt;style&gt; h2 {color: red}&lt;/style&gt;
- CSS file: h2 {color: red}

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

## CSS selectors

- `Universal`: \*
- `Element selector`: Selects by element tag for eg `h1`
- `Selector list`: seperated by comma.
- `Id selector`: Selects by id for eg `#first-name`
- `Class selector`: Selects by class name for eg `.name`
- `Descendant selector`: seperated by space or dash.
- `Direct descendant selector`: div > li: li which direct descendant of div.
- `Adjacent selector`: h1 + p: paragraph which are immediately preceded by h1.
- `Attribute selector`: input[type="text"]: $=(end with), \*=(contains).
- `Psuedo classes selector`: Specifies a state

  - `active`: clicked
  - `checked`
  - `first`
  - `first-child`
  - `hover`
  - `not()`
  - `nth-child()`
  - `nth-of-type(2n)`
  - `first-of-type`

- `Psuedo elements selector`: Let's you style particular part of selected elements
  - `::after`
  - `before`
  - `first-letter`
  - `first-line`
  - `selection`

6. Attribute(‘div[attr]’ ): Select all div elements having ‘attr’ attribute)

7. Attribute value(‘div[attr=val]’): Select all div elements with attr value equal to ‘val’

8. Universal selector ‘\*’ : Matches any type, usually ommited, eg. ‘\*.text’ and ‘.text’ are same.

9. \[attr~=value]: Elements with an attribute name of attr whose value is a whitespace-separated list of words, one of which is exactly value.

10. \[attr\|=value]: Represents elements with an attribute name of attr whose value can be exactly value or can begin with value immediately followed by a hyphen, \- \(U+002D). It is often used for language subcode matches.

11. \[attr^=value]: Represents elements with an attribute name of attr whose value is prefixed (preceded) by value.

12. \[attr$=value]: Represents elements with an attribute name of attr whose value is suffixed (followed) by value.

13. \[attr\*=value]: Represents elements with an attribute name of attr whose value contains at least one occurrence of value within the string.

14. \[attr operator value I]: Adding an i (or I) before the closing bracket causes the value to be compared case-insensitively (for characters within the ASCII range).

15. Adjacent sibling combinator(+): eg. ‘img + p’, matches the second element only if it immediately follows the first element, and both are children of the same parent element.

16. General sibling combinator(~): eg. ‘img ~ p’, separates two selectors and matches the second element only if it follows the first element (though not necessarily immediately), and both are children of the same parent element.

17. Psuedo classes(‘:’): pseudo-class is a keyword added to a selector that specifies a special state of the selected element(s). eg. div:hover, a:visited, :checked

18. Psuedo elements(‘:’ or ‘::’): pseudo-element is a keyword added to a selector that lets you style a specific part of the selected element(s). For example, ::first-line can be used to change the font of the first line of a paragraph. eg.
    ::after, ::before, ::cue, ::first-letter, ::first-line, ::selection, ::slotted, ::backdrop, ::placeholder, ::marker, ::spelling-error, ::grammar-error

19. To extract attribute(‘::attr(attributename)’): Can be used to extract href from anchor tag(a).

## CSS cascade

- order matters, the latest style is applied. Also while linking css files the last file has the final say.

### CSS Specificity:

Id>class>elements
Inline style and ! important.

### CSS inheritance:

- Not all elements inherit: for eg button and input.
- Not all properties are inheritable.

## CSS box model

- Everything in css is a box.
- Padding: Betwen `content box` and border.
- Border:
- Margin: Between border and border

**Note**: Width and height properties controls the `content box`.

**Note**: background-color is for the content box and not the whole box of the element. We can change this using "box-sizing: border-box;".

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

- `position`: static/relative/absolute.

- top, bottom, left, right affect position of the element.

- `static` is default.

- `relative`: It is still in document flow and does not take other documents place. position relative to itself.

- `absolute`: It's taken out from document flow, and positioned relative to positioned parent if any or start of the container(body)

- positioned element: Element with position attribute other than static.

- `fixed`: It is positioned wet to container. ie body. Good for navbar.

- `sticky`: sticks when hit the top.

## CSS transition

- `transition`: 1s/ms; simple usage
- Used to set transition time of element, in case it's properties changes, for eg due to hover.

### Complex transition usage:

- transition: property-name duration transition-function delay.
- Transition function: ease, ease-in, ease-out, linear, step-stsrt, step-end.

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

- Google has lots of font families for free.
- We can include them.
- [Link to google fonts](https://fonts.google.com/)

# Flexbox

- `display: flex;` Need to set this in the container.

## flex model

- Concept of `main axis` and `cross axis`.
- By default main axis goes from left to right.
- And cross axis is top to bottom by default.
- `flex-direction` property controls the main axis.

## flexbox properties

- `flex-direction: row/column[-reverse]`: Controls the main axis.
- `justify-content`: flex-start, flex-end, center, space-between, space-around, space-evenly. along the main axis.
- `flex-wrap: nowrap|wrap|wrap-reverse`: The content will not shrink to fit but wrap. Changes/controls the `cross-axis`.
- `align-items: flex-start|flex-end|center|baseline`: Distribute elements along `cross axis`.
- `align-content: start|center|space-between|space-around;` distribute content along cross axis, ie space between rows/columns, but only if we have multiple rows/columns.
- `align-self: auto | flex-start | flex-end | center | baseline | stretch;` Similar to align-items but it applies to single element.

## Flex sizing properties

These properties relate to individual items in a flex container and how they grow or shrink according to the available space.

- `flex-grow`: Its an unitless number. Controls the amount of available space an element should takeup. Accepts a unit-less number value.
- `flex-basis 200px`: Defines the initial size of an element before additional space is distributed.
- `flex-shrink`: Its an unitless number. If items are larger than the container, they shrink according to flex-shrink.

## Flex shorthand

- `flex: 2 2 10%;` Flex-grow, flex-shrink, flex-basis.

## Responsive design and media queries

## Media queries

- Width
- Height
- Orientation

### Viewport

- `min-width`: minimum of npx and above.
- `max-width`: maximum of npx and below.

- `CSS reset`: A CSS script to reset the default css of a browser.

# Bootstrap

- container
- container-fluid.

- btn-primary
- secondary
- success
- danger
- warning
- info
- light
- dark
- btn-outline-primary etc
- btn-lg/sm etc

- display-1/2/3/4
- lead
- blockquote-[footer]

- text-right/left/center

### Utilities

- text-primary.....
- text-white/dark..

- btn-primary....

### Badge

- Used in span
- `badge badge-primary...`
- `badge badge-pill`
- `btn-group`: used to group buttons.

### Alerts

- `alert alert-primary`.. etc.
- `alert-heading`: Used within an alert.
- dismissable alert: needs bootstrap js files to work.
- `aria-hidden`
- `aria-close`: aria prefix is used for accessibility/screen readers.

### Bootstrap grid system

- Works only with a container.
- contains div with class row of 12 units.
- no-gutters will eliminate space between items in a row.
- Each row contain div with class 'col' col-sm, col-6 etc.
- if nonnumber after col then 12 units is equally divided.

### Responsive BS grid

- `col-md-6`: for md and above take 6 units otherwise full row.
- md, sm, lg, xl etc

For adding images in a row, use image-fluid.

### Grid utilities

- within a row we can use flexbox like classes like `justify-content-start`, `align-items-center`, `align-sel-start etc`.
- For each of the above we have responsive variants like `justify-content-sm-start` etc.

### Bootstrap forms

- `form-control`: Used for individual inputs.
- `form-group`: Used for group of inputs.
- `form-row`:

### Navbar

### bootstrap icons

- Another option is fontawesome.

### Other bootstrap utilities

- border-[top|bottom|left] etc
- shadow
- text-success etc: For text color.
- bg-warn etc: For background color.
- margin:
- padding:
- padding and margin can be made responsive by using sm, lg etc.
- Card
- Footer
- Carousal: need js
- Drop-down
- Spinner
- Progress
- Modal

# XPATH

**Absolute Xpath** : Begins with ‘/’  
**Relative Xpath** : Begins with ‘//’

- //input[@name='uid']: based on name attribute
- //input[@type='text']: based on type of element
- //label[@id='message23']: based on id of element
- //input[@value='RESET']: based on value attribute
- //\*[@class='barone']: based on class
- //a[@href='http://demo.guru99.com/'] : based on href attribute
- //img[@src='//cdn.guru99.com/images/home/java.png'] : based on source attribute

- //\*[contains(@type,'sub')]
- //\*[contains(@name,'btn')]
- //\*[contains(@id,'message')]
- //\*[contains(text(),'here')]
- //\*[contains(@href,'guru99.com')]
- //\*[@type='submit' OR @name='btnReset']
- //input[@type='submit' AND @name='btnLogin']
- //label[starts-with(@id,'message')]
- //td[text()='UserID']

- //label[starts-with(@id,'message')]
- //td[text()='UserID']

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
