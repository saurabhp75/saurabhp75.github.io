---
title: "Epic React"
pubDatetime: 2022-09-23T15:22:00Z
tags: ["ReactJS"]
draft: false
description: "Advanced React"
---

# 1: Introduction

## 1.1 Basic JavaScript-rendered Hello World

1. How to access an element in the DOM using `document.getElementbyId()`.
2. How to create an element using `document.createElement()`.
3. How to set text content of an element by using `.textContent` property.
4. How to append an element as child to other element using `append()` and
   `appendChild()`.
5. How to set attributes(for eg. id) of an element using `.setAttribute()`.
6. How to set class of an element by using `element.className` property.
7. Difference between `.append()` and `appendChild()`
   - `.append` accepts Node objects and DOMStrings while `.appendChild` accepts only Node objects.
   - `.append` does not have a return value while `.appendChild` returns the
     appended Node object.
   - `.append` allows you to add multiple items while
     `.appendChild` allows only a single item.

## 1.2 Intro to raw React APIs

1. Difference between `imperetive` (how) and `declarative` (what) programming.
2. **React** module is responsible for creating React elements (kinda like document.createElement()).
3. **ReactDOM** module responsible for rendering React elements to the DOM (kinda like rootElement.append()).
4. `React.createElement(type, props, chidren)` API.
5. `ReactDOM.createRoot()` API.
6. `.render()` API.
7. ReactDOM module is specific for a platform (for eg for mobile/React-native and VE platforms).
8. `React.createElement(type, props, children)`: The children can also be passed as a prop.

## 1.3 Using JSX

1. Use of Babel in browser via unpkg and `script` tag with `text/babel` as type.
2. Use of JSX syntax in Javascript.
3. JSX is `compiled` to regular js by Babel, which is a code compiler.
4. `Interpolation`: Defined as insertion of something of a different nature into something else.
5. Spread oprator in JS.
6. JS and JSX interpolation and use of curly braces.
7. In JS, opening angled bracket (`<`) of opening html tag, triggers switching to JSX land.
8. In JSX, opening curly bracket (`{`) triggers switching to JS land.
9. In JSX, closing angled bracket (`>`) of closing html tag, triggers switching to JS land.
10. In JS, closing curly bracket (`}`) triggers switching back to JSX land.
11. Spreading of component props in JSX.

## 1.4 Creating custom components

1. If we look into React devtools, there is no component created when we use a normal function to create a React component.
2. If we look into React devtools, there is a component created with name of the function (which is passed as the first argument) when we use `React.createElement` to create an element. In `React.createElement` call, the first argument should have (if at all) a custom component function with capitalized name. In that case, React assumes that the variable (function name) of that name is in scope, otherwise it won't create a component.
3. When React renders a component with props it refers to component's `propTypes` property (which points to an object) of the component and passes the props to the functions in this object for validation. This object has functions to validate each prop and the function name is same as the prop. This done only in development due to performance reasons.
4. We can use `prop-types` module to validated the props instead of writing our own functions for common types.
5. If we are using Typescript then we don't need prop-types package. Additional benefit of TS is that the validations are done at compile time so their is no run time performance penalty.
6. Using `React.Fragment` we can create sibling component without introducing redundant divs in the DOM. We can also use an array but then we have to specify the key.
7. `React.Fragments` are used where we want a specific HTML structure for eg in flexbox, grid or table etc.

## 1.5 Styling

1. There are two ways to style the components in React.

   - Inline styles with the `style` prop
   - Regular CSS with the `className` prop

2. `class` attribute in HTML is referred as `className` property in DOM.
3. React/JSX uses DOM properties instead of HTML attriibutes.
4. DOM properties are camel cased in React for eg. `background-color` is
   `backgroundColor`.
5. `className` and `style` in JSX represent the `DOM properties` rather than `HTML attributes`.
6. When spreading the props in a component, be aware about the order as the
   props may get overriden.
7. When spreading the `styles` prop in the component, be careful that the styles
   applied last will override the previous one.

## 1.6 forms

1. You can attach a submit handler to a form element with the `onSubmit` prop.
   This handler will be called with the submit `event` which has a `target` property.
   That target is a reference to the `<form>` DOM node which has a reference to
   the elements of the form which can be used to get the values out of the form.
2. There are several ways to get the value of the name input:

   - Via their index: `event.target.elements[0].value`.
   - Via the elements object by their `name` or `id` attribute:
     `event.target.elements.usernameInput.value`.

3. When we submit a form, the browser, by default sends a GET request to the
   same page/url by sending the query paramters extracted from the form.
4. We can disable this default behaviour by using `event.preventDefault()`.
5. React has synthetic events (for optimization), you can access native events using
   `event.nativeEvent` from React code.
6. `console.log` of a DOM node (`event.target`) will simply prints the DOM node HTML.
   We can use `console.dir` to print the DOM object.
7. The `for` attribute used for `label` in HTML is `htmlFor` in React. After
   doing this clicking the label will shift the focus to the input element.
8. We can get the value of form inputs either from `name`, `id` and index from the
   `event` object, for eg:

   - `event.target.elements[index].value`
   - `event.target.elements.(id|name).value`

9. Sometimes you want to programmatically control form inputs. Maybe you want
   to set their value explicitly when the user clicks a button, or maybe you
   want to change what the value is as the user is typing.
10. This is why React supports `Controlled Form inputs`. Generally the form inputs
    are `uncontrolled` which means that the browser is maintaining the state of the
    input by itself and we can be notified of changes and “query” for the value from
    the DOM node.
11. A `ref` is an object that stays consistent between renders of a React component.
    It has a current property on it which can be updated to any value at any time.
12. In React, when we create a `ref` object using `useRef` hook and pass it via `ref` prop
    of a component, React will set `current` property on the object which refers to the
    DOM node that is created for this component.
13. React allows us to programmatically set the value prop on the input like so:
    `<input value={myInputValue} />`. If you set the value prop this way and
    don't provide the onChange handler, then React will give you a warning that
    the input is read only as the user won't be able to change the value. To
    remove the warning you can set the input as `readOnly`.
14. A button element can be disabled by setting `disabled` attribute/prop to
    `true`.
15. We can set a default value of form input by setting `defaultValue` prop.

## 1.7 Rendering Arrays

1. Every React element accepts a special `key` prop you can use to help React
   keep track of elements between updates. If you don’t provide it when
   rendering a list, React can get things mixed up. The solution is to give each
   element a unique (to the array) key prop, and then everything will work fine.

2. `Important rule`: Whenever you’re rendering an array of React elements, each
   one must have a unique key prop. If each component in the list is maintaining
   a state the problem will be immediately observable.

3. It is bad practise to set the key to index as this is what React is doing
   under the hood as a workaround.

4. By assigning a proper key to list component, the highlight/selection and
   focus is properly handled by React.

# 2: React hooks

## 2.1 useState

1. Hooks are used to store data (like state) or perform actions (or
   side-effects).
2. Hooks adds interactivity to the components.
3. `React.useState` returns an array of two element. The first element is a
   state and second element is a setter. Whenever the state is changed using the
   setter, the component re-renders.

## 2.2 useEffect

1. `useEffect` is a built-in hook that allows you to run some custom code
   `after` React renders (and re-renders) your component to the DOM. It accepts
   a callback function which React will call AFTER the DOM has been updated. It
   is mostly used to interact with outside world for eg. db/storage, API etc.

2. `useEffect` is not a lifecycle hook. It's a mechanism for synchronizing
   `side effects` with the `state of your app`.

3. To store and retrieve variables in the local storage, use the API below:

   - `window.localStorage.getItem('name')`
   - `window.localStorage.setItem('name', name)`
   - `window.localStorage.removeItem('name')`

4. To view local storage in Chrome dev tools, go to `application` tab and click
   on `local storage` on the left tab.

5. `useState` hook uses the initial value only during the first render of the
   component. In the subsequent re-renders, it just ignores the initial value
   passed. If the initial value is computationally evaluated we can put that
   into a function and pass it to useState. In that case `useState` hook will
   only call that function to get the state value when the component is rendered
   the first time and not in subsequent re-renders. This is called
   `lazy state initialization`. The function passed is called
   `lazy initializer`. If we are just passing a simple expression as an initial
   value than it is better not to use the function as it will be more of an
   overhead to define a function in every render. `lazy initializer` can also be
   used for `useReducer` hook.

6. If we use an object in the dependency array of `useEffect` hook, the
   useEffect will trigger for every render because React does a
   `shallow comparison` (===, Object.is) and even if the object's properties are
   not modified, the object is a different object.

7. Re-render of the parent component triggers the render of the child
   components.

8. Custom components start with a `use` prefix to keep the React compiler happy.
   Custom hooks uses other hooks which could be built-in hooks or custom hooks.

9. To serialize/deserialize objects, we use `JSON.stringify` and `JSON.parse`.

10. Component update is triggered by state change, parent element re-render,
    context change.

11. `useEffect` returns a `cleanup function` which is runs before every
    invocation of `useEffect` function except the first and also on component
    unmount.

12. `useEffect` without second parameter will run after every render. We depend
    on everything. We sync with all states.

13. `useEffect` with an empty array as second argument will run only after first
    render. We depend on nothing. We sync with no state.

14. The question is not "when does this effect run" the question is "with which
    state does this effect synchronize with".

    - useEffect(fn) // all state
    - useEffect(fn, []) // no state
    - useEffect(fn, [these, states])

15. Component mount cycle/sequence

    - lazy initializers for useState/useReducer.
    - Render (component function execution).
    - React updates DOM.
    - Run layout effects.
    - Browser paints screen.
    - Run effects // For ALL useEffect functions which triggerred.
    - Wait for user action or trigger from outside world.

16. Component re-render/update cycle/sequence

    - Render (component function execution).
    - React updates DOM.
    - Cleanup layout effects.
    - Run layout effects.
    - Browser paints screen.
    - Cleanup effects. // Only for useEffect functions which triggerred
    - Run effects. // Only for useEffect functions which triggerred
    - Wait for user action or trigger from outside world.

17. Component unmount cycle/sequence.

    - Cleanup LayoutEffects.
    - Cleanup Effects. // For ALL useEffects functions

## 2.3 Hooks follow

## 2.4 Lifting state

1. Lifting the state up: Required when sharing state between sibling components.
   The state managment is placed in the lowest common parent of siblings. The
   parent passes the state and mechanism to update the state.

2. As a developer, you should try to keep the state as close as possible to a
   component which needs it.

## 2.5 useState: tic tac toe

1. `Managed State`: State that you need to explicitly manage.
2. `Derived State`: State that you can calculate based on other state, managed or derived.

## 2.6 useRef and useEffect (DOM interaction)

1.  `useRef` is used to preserve a value between renders. Setting it doesn't
    cause a render unlike `useState`. The `current` property stores the value.
    It's main use cases are:

- To store a reference to DOM node of the components.
- To store previous state.

## 2.7 useEffect: HTTP requests

1. The function in `useEffect` should not be an async function as a cleanup
   function is expected as return instead of a promise. An asyn function
   automatically returns a promise (whether you're not returning anything at
   all, or explicitly returning a function)

2. `Automatic-batching`: Introduced in React 18. React groups multiple state
   updates into a single re-render for better performance.

3. `Error boundary` should not be used application wide but near a component
   where its required. When implementing your own `Error boundary`, you should
   implement `getDerivedStateFromError()` method, which takes `error` as
   argument and should returns an error. When we pass a `key` prop to
   `ErrorBoundary` component, everytime the `key` prop changes, the
   `ErrorBoundary` component state is reset. It is umounted and remounted. This
   is a generic concept, anytime a prop chsanges, the component is re-rendered.

4. `ErrorBoundary` component from `react-error-boundary` takes `ErrorFallback`
   `onReset` and `resetKeys` as props. `onReset` prop takes a function which is
   called when the `ErrorBoundary` is reset. `resetKeys` prop is an array of
   values, which if changed will cause the reset of ErrorBoundary's internal
   state ans will cause an unmount and remount of `ErrorBoundary` component.
5. `ErrorFallback` component takes `resetErrorBoundary` and `error` props.

6. `resetErrorBoundary` is a function and is used to reset the internal state of
   the `ErrorBoundary` component without umounting and remounting the
   `ErrorBoundary` component.

# 3: Advanced React Hooks

## 3.1 useReducer: simple Counter

1. `useReducer` is used to separate the state logic from the components that
   make the state changes. It is mostly used when the state is an object.

2. When the state is an object, the reducer function "merges" the current and
   the new state.

3. `API`: const [state, dispatcherFunc] = useReducer(reducerFunc, initialState)

4. Typically, you'll use useReducer with an object of state.

5. `useReducer` helps in seperating rendering and state management logic.

6. `Reducer function` takes current state and action as arguments and returns
   the new state. The action argument can be a simple variable, object or a
   function.

7. `Dispatch function` takes action as an argument, which is passed as second
   argument to the reducer function.

8. As per Redux convention, `action` has a `type` and `payload` properties. The
   `reducer` function has a `switch` statement on `type`.

9. `lazy initialization`: If you pass a third function argument to `useReducer`,
   it passes the second argument to that function and uses the return value for
   the initial state. This could be useful if our `init` function (See code
   below) read into localStorage or something else that we wouldn't want
   happening every re-render.

```javascript
function init(initialStateFromProps) {
  return {
    pokemon: null,
    loading: false,
    error: null,
  };
}

// ...

const [state, dispatch] = React.useReducer(reducer, props.initialState, init);
```

## 3.2 useCallback: custom hooks

1. `useCallback`: Returns a new function(the one pass to useCallback) on render,
   if the dependency list changes, otherwise returns the previous one.

2. `useMemo`: Returns a new value (returned value) on render, if the dependency
   list changes, otherwise returns the previous one.

3. The entire purpose of `useCallback` is to `memoize a callback` for use in
   `dependency lists` and `props` on `memoized components` (via `React.memo`).
   The only time it's useful to use `useCallback` is when the function you're
   memoizing is used in one of those two situations.

4. `useLayoutEffect`: The callback is called as soon as the component is mounted
   without waiting for the browser to paint the screen. The cleanup is also
   called as soon as the component is mounted without waiting for anything.

## 3.3 useContext: simple Counter

- `Prop drilling`: When the props are passed deep down from a parent component.
- `Composition in React`: Prop drilling can sometimes be avoided by using
  composition in React.
- `createContext`: First argument provides a default value which React will use
  in the event someone calls `useContext` with your context, when no value has
  been provided (ie not wrapping the component in provider). It is not recommend
  to use a default value as it's probably a mistake to try and use context
  outside a provider,
- A common mistake of context (and generally any "application" state) is to make
  it globally available anywhere in your application when it's actually only
  needed to be available in a part of the app (like a single page). Keeping a
  context value scoped to the area that needs it most has improved performance
  and maintainability characteristics.

  ## 3.4 useLayoutEffect: auto-scrolling textarea

  ### There are two ways to tell React to run side-effects after it renders:

1. `useEffect`: If you don't need to interact with the DOM at all or your DOM
   changes are unobservable.
2. `useLayoutEffect`: If you need to mutate the DOM and/or do need to perform
   measurements. Also, if you're updating a value (like a ref) and you want to
   make sure it's up-to-date before any other code runs, then use `useLayoutEffect`.
3. React 18 has smoothed out the differences in the UX between `useEffect` and
   `useLayoutEffect`.

**Note**: React updates the DOM and then browser paints the screen. After this
useEffect callback is aclled, it doesn't block the browser from painting.
Whereas, useEffect callback runs ust after the DOM is updated and before the
browser starts to paint. If you are making observable changes to the DOM, then
it should happen in `useLayoutEffect`, otherwise `useEffect`.

## 3.5 useImperativeHandle: scroll to top/bottom

- `forwardRef`: Lets your component expose a DOM node to parent component with a
  `ref`.
- `forwardRef` use cases:
  - Exposing a `DOM node` to the parent component.
  - Forwarding a `ref` through multiple components.
  - Exposing an `imperative handle` instead of a DOM node.
- By exposing a `ref` to the DOM node inside your component, you’re making it
  harder to change your component’s internals later. You will typically expose
  DOM nodes from reusable low-level components like buttons or text inputs, but
  you won’t do it for application-level components like an avatar or a comment.
- `useImperativeHandle`: Allows us to restrict the functionality exposed by `forwardRef`.

## 3.6 useDebugValue: useMedia

- `useDebugValue`: Used `ONLY` for custom hooks and not for buit-in ones. It also
  takes a second argument which is an optional formatter function. It is used
  when a custom hook is used multiple times and we want to track the usage.

# 4: Advanced React Patterns

## 4.1 Context Module Functions

1. `Context Module Functions`: This pattern allows you to encapsulate a complex
   set of state changes into a utility function which can be tree-shaken and
   lazily loaded. The user (component) only need to pass dispatcher function
   along with state and updates to functions defined in context module. The
   function is defined in a seperate module where the context is created and
   provided.
2. You can set the context displayName and it'll display that name for the
   Provider and Consumer in React DevTools.
   ```javascript
   const MyContext = React.createContext();
   MyContext.displayName = "MyContext";
   ```

## 4.2 Compound Components

1. `Compound Components`: This pattern enables you to provide a set of components that implicitly share state for a simple yet powerful declarative API for reusable components.

2. Compound components are components that work together to form a complete UI. The classic example of this is `<select>` and `<option>` in HTML.

3, In compound components, the `implicit state` is passed from parent to child using `React.cloneElement` and passing it via a prop.

## 4.3 Flexible Compound Components

1. The `Flexible Compound Components` Pattern only differs from the previous exercise in that it uses React context. You should use this version of the pattern when the components to which the props have to added are not `direct descendants` of the parent but lie deep down the tree.

## 4.4 Prop Collections and Getters

1. The `Prop Collections` and `prop Getters` Pattern allows your custom hook to support
   common use cases for UI elements people build with your hook.

2. These patterns are used for custom hooks to pass most commonly used props as an
   object.

3. It is more flexible to pass getter function (prop getter) which returns an
   object. Prop getter is a better pattern and should be used over prop
   collection as it allows composition of the props.

## 4.5 State Reducer

1. `State Reducer Pattern`: Inverts control over the state management of your
   hook and/or component to the developer using it so they can control the state
   changes that happen when dispatching events.

2. The state reducer allows users of component to manage what state changes are
   made when a state change happens.

3. The user of hook/component can pass the reducer to the reducer. There is a
   default reducer as well, in case the user does not pass their own reducer.

4. The module containing custom hook/component can also define action `types` to
   prevent use of strings by the user and hence avoiding typos and increase
   maintainability.

## 4.6 Control Props

1. `Control Props pattern`: Allows users to completely control state values
   within your component/custom hook.

2. This differs from the `state reducer pattern` in the fact that you can not
   only change the state changes based on actions dispatched but you also can
   trigger state changes from outside the component or hook as well.

3. The state reducer allows users of component to manage what state changes are
   made when a state change happens, but sometimes people may want to make state
   changes themselves. We can allow them to do this with a feature called
   `Control Props`.
