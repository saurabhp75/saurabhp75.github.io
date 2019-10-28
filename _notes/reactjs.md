---
layout: single
title: "ReactJS"
excerpt: "Intro to ReactJS"
---

**JSX**: it's like XML, every tag needs to be closed, <br /> and not <br>.

React component names must be capitalized.

The official name of the Javascript standard is **ECMAScript**.

### Component update lifecycle(when props or state change)
1. get derived statefromprops().
2. Shouldcomponentupdate (nextprops, nextstate). You can cancel the update process here.
3. Render().
4. Update child components.
5. Getsnapshotbeforeupdate(prevprop, prevstate). Get scrolling position of user.
6. Componentdidupdate().

React 16.8 and later supports function based state using react hooks(for eg useState).

It's best practise to create as many stateless component(dumb) as possible.

- key in rendering list components.
- It should be outside of the component.


### Debugging react apps:

### Compile time error:
- See error output on console.

### Runtime error:
- See source code on chrome devtools and add breakpoint.
- Catch errors runtime: Errorboundary.
- Only works in production.
- Only use them if there is code which fails.
- This avoids the react app crash in case of error.


Main, header, footer tag in html.

**React elements**: had, returned by react components. Class name can be applied.

**React components**: Returns single react element. Class name can't be applied.

### Codepen,jsbin 

### Arrow functions shortcut:
- if there is only a return statement in function body, then return keyword can be omitted, also the parentheses of function body.
- if there is only one argument, then brackets can be omitted.
```js
export default

import {Val [as value]} from './app'
import * as bundled from './app'
```

### Class properties and methods
Using arrow functions gives consistent behaviour of this keyword. Also properties can be initialized directly without the need for constructor.

Classes contain properties and methods
### Classes in js
```js
class Person extends Master{
name='max'
call = () => {...}
}

let obj=new Person()
```

In legacy js, properties are initialized using constructors, but in es7 they are directly initialized

### spread and rest operator

### destructuring

CSS auto prefixing

Container components: with state

**Inline styles**: Scope is limited to the component. Hover effect is complex for inline CSS styles. 

### React app structure
- Component with state should have lean render() method.


### Components "creation" lifecycle(only availaible in class based componenents)
- Predefined methods of Component classes which we can override.
1. creation: constructor(props), added by ES6. Don't cause sideefeects in this method. Initialize state.
2. static getDerivedStateFromProps(props, state), Added in v16.3, 
3. render(): prepare and structure your jsx code, also renders child componenents
4. ComponentDidMount(): can add http request

### Components "update" lifecycle(only availaible in class based componenents)









 