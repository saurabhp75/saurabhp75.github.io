---
title: "ReactJS"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["ReactJS"]
draft: false
description: "Introduction to ReactJS"
---

[Prop vs state](https://kentcdodds.com/blog/props-vs-state)

- **JSX**: it's like XML, every tag needs to be closed, &lt;br/&gt; and not &lt;br&gt;.
- We write JSX code which is transformed into HTML & JS by React library.
- React app is made up of components, which is a custom html element.
- React component is a function returning JSX code.
- Each component has its own JS file with the same name as the component.
- All components are rendered under the `App` component.
- React component has it's own folder under `components` folder.
- React is declarative, you don'e have to add text to an element and append it manually.
- React component names start with capital letter to distinguish them from regular html tags.
- Should return only one root component in the return statement.
- In js a statement can span multiple lines if enclosed in round brackets.
- The official name of the Javascript standard is **ECMAScript**.
- `/src/index.js` will be the first file to be executed in a react app.
- Only `/public/index.html` file will be delivered to the browser.
- React.createElement('div', properties_object, child1, child2.....).
- `import react from 'react'` is not needed in modern code but can be used for readability.

## How React works

- First fetch index.html
- Then fetch bundle.js
- Unpack bundle.js to get app.js, index.js, react.js
- Then run index.js which in turn invoke app.js.

## What is a react component?

- It returns JSX which shows the html.
- It also responds to user actions using event handlers.

## React and ReactDom

- When we are working with React, we are actually working with React and ReactDom.
- These are two different libraries
- `React`: Also called "Reconciler". Knows how to work with components. How to call a component function and parse the returned JSX to decide whether to create some html element or call another component function.
- `ReactDom`: Also called "Renderer" as it is responsible for showing content to a user ie to render. Takes instructions on what we want to show and convert it into html. It parses the JSX and convert it into html and insert in the DOM at a specific location and show it to the user.

## New way to run create-react-app

- Old way was to first install create-react-app gobally and then use it to create a react app.
- New way is to use npx command to create a react app as it will use the latest version of create-react-app without installing it.
- Usage: $ npx create-react-app my-app
- Note: npm uninstall -g create-react-app or yarn global remove create-react-app to ensure that npx always uses the latest version.

## what create-react-app installs

- Webpack, Babel and dev server

## import statement vs require statement

- import statement is required for ES2015 modules

  .

- require statement is required for CommonJS modules.

## Difference between html and JSX

- Use of className instead of class.
- Use of `{}` for styles and style as an object.
- You can't use a JS object inside `{}` JSX, where a string is required.
- Also use htmlFor in place of "for" property of label.

## Three tenets of a component:

- Configurability.
- Nesting.
- Reusability.

## Props system

- Used to pass data by parent to the child component.
- It is used to configure child component.

## Rules for class based components:

- Must extend React.Component class.
- Must define render() method.

## Rules of state

- State is a JS object that contains data relevant to a component.
- Updating state causes the component to re-render.
- State MUST be initialized when a component is created.
- State can ONLY be updated using the function setState().

## What is useState function

- It is a function to work with the React "state" system.
- State system is used to keep track of application variables which may or maynot change over time.
- State system is also used to update the html on the screen.

## CSS in React

- Use `import './fileName.css'`.
- Use `className` attribute in JSX.
- To set style of a component use style = `{{height: '50%'}}`, ie use JS object to set the style.
- For properties with hyphen like background-color use backgroundColor or close the property in quotes.

### JSX under the hood

- react and react-dom
  -In earlier React projects we used to import react, but now we only import react-dom.

### Declarative vs Imperative

- React is declarartive.
- In React we define target component state and React does that for us under the hoods.

### Container component

- Contains other components in opeing and closing tags.
- They use `props.children` for the enclosing containers.
- They are used to set the styles of children components.

### React state and working with events

- To add event listener to component, add property `onXxxx` and set it to a function.
- Use react hooks, `useXXX`, inside the component function.
- React hooks should not be called in any nested function.
- Each component has its own state.

## When does the component should have a state

- When the component has data and change in the data should be reflected in UI.
- Then the component should have a state.

### Passing data from child to parent (lifting the state up)

- Pass `onXxxx` function to the child as prop and call it from the child and pass the data.
- Passing data between sibling components: use parent as an intermediate.

## Two way binding

- It creates a controlled component.
- The value and changes to the value are handled in the parent component.

### Shortcut for writing React component

- When there is no content between opening and closing braces we can use &lt;ComponentName /&gt;

### Using JS in JSX code

- Enclose JS expression in curly braces {}.
- Long statements like `if` and `for` are not allowed in the braces. But ternary operator is allowed.
- One line arrow functions are also allowed in the curly braces?
- We can also use the array methods like `forEach` etc.

### Passing value via prop

- in parent component add a property for eg `text={varName}` in the child component.
- in the child component use the props.text to access the passed value.
- a react component receive only one parameter conventionally named props.

### Organising code

- Create UI folder for container components used for styling.

- Create components folder for other components.

- organize component group in a folder.

## Adding event handlers to react components

- Can be only added to native html elements?

- Add a property for the event and define a handler within the function body of the component.

- `onClick={clickHandler}`.

## Composition (Children props)

- Building UI using smaller components is called composition.
- Use `props.children` for container components
- Also use `const classes = "containerClassName + props.classsName"`.
- This helps in removing style redundancy and redundant divs.

## React state

- React component function only execute once.

- React function don't re-run automatically whenever a variable in a function changes.

- To make a function run everytime a variable changes, we need to `import {useState} from 'react'`.

- const [value, setFunction] = useState(initialValue)

- It returns a value variable and a function which should be used to change the value.

- Calling the setFunction triggers/schedule the component function to be invoked.

- State is maintained per component instance. If we have multiple instances of that component, then only the changed instance will be re-evaluated.

## React hooks

- Have form useXxx.
- Should always be called from component function.
- They should not be called from a nested function inside react component.
- `useState` can also be used to maintain a variable which does not get reinitialised every time the component function is executed.

#### onChange Vs onInput for form input.

### Multiple states in a component.

- One value Vs object.

### Updating state that depends upon previous State.

- use a callback function in the state change function. The callback function should return the updated state.

### Adding two way binding for input fields in a form.

- Use value attribute on the input and set it to state variable.

- clear the state variable when form is submitted.

### Child to parent data communication.

- In parent define a function with arguments and pass to child as a prop.

- In child component call the function passed via prop, while calling pass the data as parameter.

### Lifting the state up

- From a child component when data is passed to parent component using a passed function, it is called lifting the state up.
- The data is not stored in the child component, but the parent component.

## Controlled component

- Data and the changes to the data is handled in the parent component.

### Presentational vs stateful component

- Stateless vs stateful component.
- Dumb vs smart component.
- One has a state and the other does not.
- In a React app most of the components are dumb.

### Rendering conditional components

- We can use ternary operator for conditional content.
- We can also use short circuiting of `&&` operator.
- In case of list, each item should have a unique identifier. Ths enables react to uniquely identify an item.
- We can also have conditional return staements.

## Styling React components

- The CSS in files is global.
- Two ways to scope the styles to the components
  - **Styled components**
    - Install `styled-components`.
    - `import styled from 'styled-components'`
    - const mybutton = styled.button`put the contents of CSS here (backticks), use & in place of the component(button).`
    - We can use props to set css properties in backticks in styled components.
  - **CSS modules**
    - Preferred approach.
    - Only available in projects configured to support it.
    - Projects created using create-react-app supports it.
    - Use `import styles from '/Button.module.css'`.
    - Rename css file as Button.module.css. Acess the class as properties.
    - Use `className={styles.button}`

### Conditional and dynamic styles

- Use string literal with ternary operator to add a class conditionally in a react component.

### Debugging react apps

- In Chrome add breakpoint to the sources and debug.
- Install `react devtools` chrome extension.
- Adds two new tabs in the developer tools window, viz components and profiler.

### Compile time error:

- See error output on console.

### Runtime error:

- See source code on chrome devtools and add breakpoint.
- Catch errors runtime: Errorboundary.
- Only works in production.
- Only use them if there is code which fails.
- This avoids the react app crash in case of error.

### Wrappers and Fragments

- JSX limitations and Fragments.
  - React components can return only one root element.
  - A variabe in JSX can contain only one root element.
  - We can wrap multiple elements in an array as a workaround but then we have to attach an id also.
  - Normall we wrap the multiple components in a div, which leads to `div soup`.
  - One solution could be to use a custom wrapper conponent which returns props.children.
  - This does not render anything on the DOM.
  - React has a built-in wrapper component call `React.Fragment` which we can use.
  - &lt;React.Fragment&gt; Multiple components &lt; / React.Fragment &gt;
  - Or if the project settings allow we can also use &lt;&gt; Multiple components &lt; / &gt;
- Cleaner DOM with portals.
- Wrapper/Fragment component

### Portals

- Used for modals, sidebar, dialogue and all kinds of overlays.
- If they are deeply nested, not good for portability.
- When using portals, the rendered HTML will be different from the JSX code, but will be semantically correct.
- Mark a place(s) in html where the component should be rendered, using a div with Id.
- This helps the screen readers.
- Create backdrop and overlay divs in the HTML.
- import ReactDOM from 'react-dom'

  ;

- ReactDom.createPortal(container, parentElement)

### Using Refs

- Refs allow us to get access to other DOM elements and work with them.
- `import React, { useState, useRef } from 'react';`
- `const nameInputRef = useRef();`
- `&lt;input id="username" type="text" ref={nameInputRef} / &gt;`
- `nameInputRef.current.value = '';`
- If you pass a ref object to React with `<div ref={myRef} />`, React will set its `.current` property to the corresponding DOM node whenever that node changes.

### useState vs useRef

- When we have to just read the value from the component, we use `useRef`.
- When we need to update/change the value, we use `useState`.
- Mutattingthe ref doen't trigger a render.

### Controlled vs Uncontrolled Components

- The term is used for input or form components.
- When using refs, React is not controlling the state of the component.
- The value in the input is reflected back due to the default behaviour of the input element.
- When using useState for input and form components, React manages the state and we have to feed the input back to element to update.

## Working with side effects

### What is a side effect:

- Anything apart from core react functionality for eg sending an http request or storing in browser local storage. Setting Timers and intervals etc.
- These tasks should happen outside normal component evaluation and render cycle since they may block or delay rendering.
- To handle such effects we use `useEffect` hook.
- useEffect(fn, [dependencies])
- The function fn should be executed after every component re-evaluation if the specified dependencies change.
- If no dependencies are specified, ie the second argument is not specified, then fn will run for every component evaluation.
- If second argument is an empty array, then, fn will run only the first time when component is mounted and rendered.
- This can be used to avoid infinite loops to run a function only once (no dependencies) or when the dependencies change.
- `Cleanup function`: We can return a function from fn, which will run everytime before fn runs, except for the very first time. This can be used for debouncing, where we return a function which clears the timer set in the fn. This returned function is used as cleanup function.
- If second argumet is an empty array, the cleanup function is executed when component is removed from the DOM

## Managing more complex state with reducers

- `useReducer`: Used to manage more complex state.
- Used when a state depends upon some other state.
- Reducer FN can be declared outside the component function as it don't use anything defined in component function.

## Manage app wide state with context

### Effects reducers and context

### useReducer Vs useState

- Normally use useState.
- Switch to useReducer if useState becomes too complicated.
- Use useReducer when dealing with multiple related states, which should be aggregated in an object.

### React Context

- When a state is required by multiple components and we have to pass it via props to them. This firms a chain of props forward where intermediate components might not even need the props they are forwarding.
- Component wide behind the scenes state storage.
- create context
- wrap the components using provider.
- the wrapped components will have access to the context.
- components listen to the context by either using a consumer or a react hook, useContext.
- context object can contain both values and functions.

### Context limitations

- It is not optimised for high frequency changes.
- It's not good for component configuration, for eg if we use it for a button, then the button will not be generic and configurable.

### Rules of using React hooks

- Only call them from react components or custom hooks.
- The React hooks start with use.
- Call React hooks from top level, not nested inside any other function or block statements.
- For useEffect hook add everything in the dependency, whatever is used in the fn.

Note: Ref prop is available in all built-in html components.

## Forward Refs

# React behind the scenes

### Component update lifecycle(when props or state change)

1. Get derived statefromprops().
2. Shouldcomponentupdate (nextprops, nextstate). You can cancel the update process here.
3. Render().
4. Update child components.
5. Getsnapshotbeforeupdate(prevprop, prevstate). Get scrolling position of user.
6. Componentdidupdate().

### React and ReactDOM

- React deals with containers, props, states, context etc, whereas ReactDOM delas with what user sees.
- React determine how component tree looks like currently and whatit should like by calculating the diff.
- React send diff to ReactDOM which then does the changes to the real DOM.
- Re-evaluating of a component does not mean re-evaluation of the DOM. DOM re-evaluation happens only when there is a difference.
- React evaluates the differences on virtual DOM in memory, and sends the difference to ReactDOM.
- Comparison on the virtual DOM is fast as compared to real DOM.

### Preventing unneccesary Re-evaluations with React.memo()

- Use `export default React.memo(DemoList);`
- The above only works for the function based component.
- React.memo() should be used for large components as it has overhead of comparing previous prop with the current one.
- `===` Works for primitive values but not for objects.
- So function objects passed as props will trigger re-evaluation. To fix this we can use useCallback hook to tell react to store the function and not recreate it in re-evaluation.
- `useCallback (fn, [])`, array stores the dependencies of the function.
- One re-evaluation of the component can lead to multiple state changes. There is no one to one relationship. The state changes are scheduled by React.
- `State batching/scheduling`: If we change two different states in a component consecutevly, the component will be re-evaluated only once.
- useMemo() hook: Use to memoise the variables which are stored somewhere in memory and are not recreated with every component re-evaluation.

```javascript
// Memoising a sorted list, to save the compute time
// This will run only when items array change and not
// on every component evaluation.
const sortedList = useMemo(() => {
  return items.sort((a, b) => a - b);
}, [items]);
```

- React.memo() should be used for large components as it has overhead of comparing previous prop with the current one.

- `===` Works for primitive values but not for objects.

- So function objects passed as props will trigger re-evaluation. To fix this we can use useCallback hook to tell react to store the function and not recreate it in re-evaluation.

- useCallback (fn, []), array stores the dependencies of the function.

## Class based components

- This is older approach.
- Class based components can work along with functional components.
- To access props in render method, use this.props.
- The state is initialised in a constructor using this.state and is an object.
- The state is changed using this.setState() method. We can pass partial object to the method, react will merge it with state behind the scenes.

### Lifecycle methods:

- `componentDidMount()`
- `componentDidUpdate(prevprops, prevstate)`
- `componentWillUnmount()`

### Error boundary

Componentdidcatch()

### Custom hooks

- Outsource stateful logic into reusable functions.
- Must always start with `use`.
- They don't return a JSX.
- The filename should be `use-xxx`.
- The hooks used in custom hooks are associated with a component importing them.

### working with forms and user input

- Complexity in forms is when to validate the input and show feedback to user.
- Validation can be done on form submission, input focus change and every keystroke.
- We need to validate and provide user feedback on all three for best user experience.

Note: ref prop works only on html elements?

### using ref Vs state

- when we need to read input value at every keystroke, use state. Also if you want to reset input on submission.

- when we need to read input value only at form submission, use ref.

Note: Event triggered when input loses focus is `blur`.

Formik : react library for working with forms.

## Redux:

- State management system for cross component or app wide state.
- Types of state in react
  - Local state
  - Cross component state.
  - App wide state.
- For cross component and app wide state we can use redux and redux utils.

```javascript
class Product extends Component {
  render() {
    return<H2>This is a heading<H2>;
  }
}
```

Redux

- npm i redux redux-react.
- central data store.
- reducer function triggered by dispatcher functions. Mutates data in store.
- dispatcher.
- components dispatch actions and subscribe for state/data changes.

Redux Vs context
Context is for low frequency state changes like login state etc.

Reducer function
It is executed by redux library.

Receives two parameters, old state and action dispatched and return a new state object.

It is a pure function, same input values always produce same output. There should be no side effects is sending http request or read/write to local storage etc.

```
redux.createStore(reducer Fn)

store.subscribe(fn)

store.getState()
store.dispatch(action);
store.dispatch({type: 'increment'});
```

Redux code is placed in `src/store` folder. Create store and dispatcher function in a file here. Export store from this file.

In component file subscribe and dispatch to the provided store in appjs file. useSelector, useStore.

useDispatch(), returns a dispatcher function to dispatch actions to the store.

In appjs file import provider from react-redux. Wrap app component in provider component with store property. The store property is imported.

In the reducer function, always return a new state which will overwrite the previous state. Never mutate the state in the reducer function.

Redux toolkit

- makes working with redux easier.
- npm i @reduxjs/toolkit
- redux is automatically installed with above command.

`import {createSlice} from @reduxjs/toolk`

Check the import statement for default export when splitting the code in slices.

Side effects, asyc functions and redux

Reducer function should be pure, side effect free and synchronous functions.

Where to put side effects and async code in redux.

Inside useEffect() in component or
Inside custom action creators.

Fat reducers, components or action
Coding choice.

Prefer reducers for synchronous side effect free code.

Prefer components or action creators for asynchronous code or code with side effects.

Action creators and think

Thunk
A function that delays action until later.

Debugging redux toolkit based apps, use redux devtools chrome extension or install stand alone.

## SPA apps

- The URL always remain the same.
- disadvantage is that we cannot share a URL to particular page of info. We can only share URL of the app itself.
- Only one http request to server, then the page is manipulated using reactjs.

Client side routing. React router.

## what is routing

React router
Changes the URL in the browser based on user clicks but doesn't send any request to the server or reload the page.

Install react router Dom.

Wrap the components in route component with path prop.

Wrap the app component with browserrouter.

Keep wrapped components in the page subfolder.

When we loads a new page the application state is lost.

Clicking on the links sends a request and loads the page.

Use link component in place of anchor tag from react router to prevent sending a request on clicking a link.
Use to prop instead of href in this component.

Use navlink in navigation header instead of link. This will make them active if the page loaded is matching. For this we need to set the class/style for activeClassName prop.

For dynamic routes use colon : and useParams.

Switch component: only one of the children is shown.

Use exact prop to match the exact string in the URL.

Nested routes
The route can be used in a nested manner, but path should follow the nested hierarchy.

Redirect
Redirect component with to props.

Programmatic navigation.
use history() hook.

history.push(): back button works. Add a page on history stack.

history.replace(): back button doesn't work. Replace current page on history stack.

Query parameters don't effect the route/path.
Change query parameter using useHistory hook.
Read query parameter using useLocation hook.

URLSearchParams(): Web api.

####

**Note**: Check if value returned from array find is a copy or reference.

- `componentDidUpdate()`: runs on every re-render, similar to `useEffect` without any dependencies.

- `componentDidMount()`: runs when component is mounted to the DOM, similar to `useEffect` without empty dependency array.

## How to publish react apps

Client side routing Vs server side routing.

## Deployment steps:

- Develop
- Test
- Optimization, lazy loading.
- Build app for production.
- Upload production code to server.
- Configure the server.

### lazy loading

- Split code into multiple bundles which are downloaded only when needed.

- you can split code route.
- replace imports with code below.
- React.lazy(()=>import())

Suspense component for fallback.

### building code for Deployment

- npm run build.
- put the bundles in build folder.
- static folder under build folder.

React spa is a static site.
We need static site host for deployment.

Search for static website hosting provider.

Amazon S3, Firebase.

When hosting spa configure server to ignore the subpath and serve only index.html. ie rewrite all URLs to index.html.

- **Note**:
- React 16.8 and later supports function based state using react hooks (for eg useState).
- React hooks were introduced in this react version.
- Class based components can't use React hooks.
- Prior to React 16.8, to manage state we needed class based components.
- In a React application, it is best practise to create as many stateless component(dumb) as possible.

**React elements**: Had, returned by react components. Class name can be applied.

**React components**: Returns single react element. Class name can't be applied.

- [https://codepen.io/](https://codepen.io/)
- [https://jsbin.com/](https://jsbin.com/)

```js
export default

import {Val [as value]} from './app'
import * as bundled from './app'
```

**Inline styles**: Scope is limited to the component. Hover effect is complex for inline CSS styles.

### React app structure

- Component with state should have lean render() method.

### Components "creation" lifecycle (only availaible in class based componenents)

- Predefined methods of Component classes which we can override.

1. creation: constructor(props), added by ES6. Don't cause sideefeects in this method. Initialize state.
2. static getDerivedStateFromProps(props, state), Added in v16.3,
3. render(): prepare and structure your jsx code, also renders child componenents
4. ComponentDidMount(): can add http request

### Components "update" lifecycle(only availaible in class based componenents)
