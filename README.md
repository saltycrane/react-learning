# React Learning

This is code for tutorials I do as I learn React et al. Uses Webpack, React Hot Loader, React 0.14, Babel 6, ES6.

### Tutorials / Examples

1. [Webpack / Hot Loader setup](/1.0-webpack-react-hot-loader)
2. React
  1. [React documentation - Tutorial - Comments](/2.1-react-tutorial-comments)
  2. [SurviveJS Online Book - Kanban App](/2.2-survivejs-kanban)
  3. [React documentation - Thinking in React](/2.3-thinking-in-react)
3. Redux
  1. [Redux documentation - Basics - Todo List](/3.1-redux-basics-todo)
  2. [Redux documentation - Advanced - Reddit API](/3.2-redux-advanced-reddit)
  3. [Redux examples - TodoMVC](/3.3-redux-todomvc)
4. React Router
  1. [React Router documentation - Basics](/4.1-react-router-basics)

### Styling Comparison

I took some existing CSS and HTML and created some example code for 3 additional different styling methods: Inline Style in JS, CSS Modules, and Radium.

NOTE: the original CSS and HTML was done by my co-workers-- it is not my own code.

1. [CSS Stylesheet (original)](/5.1-contacts-css)
   - Uses normal CSS (Sass) stylesheets
   - CSS classes are set using the `className` attribute of React elements
2. [Inline Style in JS](/5.2-contacts-inline-style)
   - Style information is put inside a Javascript object instead of CSS
   - Doesn't support `:hover` or other pseudo selectors
   - Doesn't support media queries
   - https://facebook.github.io/react/tips/inline-styles.html
   - https://www.youtube.com/watch?v=ERB1TJBn32c
3. [CSS Modules](/5.3-contacts-css-modules)
   - CSS is used but definitions are local to a module
   - A CSS module is created for each Javascript module
   - The Webpack CSS loader transforms the local CSS modules into global BEM-like CSS definitions
   - http://glenmaddern.com/articles/css-modules
   - https://www.youtube.com/watch?v=zR1lOuyQEt8
   - https://github.com/css-modules/webpack-demo
   - Doesn't have individual variables
     (use specific classes with composition or global Sass variables instead)
     https://github.com/css-modules/css-modules/issues/22 
   - Use of child selectors goes against the encapsulation philosophy of CSS modules
     https://github.com/css-modules/css-modules/issues/21
   - It's possible to compose with external libraries like font awesome
     https://github.com/css-modules/css-modules/issues/58#issuecomment-143685707 
4. [Radium](/5.4-contacts-radium)
   - This is like using #2 Inline Styles but it fixes some problems.
   - Supports `:hover`, `:focus`, and `:active`
   - Supports media queries
   - Supports using an array of styles
   - http://stack.formidable.com/radium/
   - Not sure how to handle child selectors (same for regular inline style)
   - Doesn't support `:before`, `:after`, `:checked`, or `:last`
     [Radium FAQ](https://github.com/FormidableLabs/radium/tree/master/docs/faq#how-do-i-use-pseudo-selectors-like-checked-last-before-or-after)
     [Stack Overflow answer](http://stackoverflow.com/questions/28269669/css-pseudo-elements-in-react)

### Testing

1. [Simple Mocha React example](/6.1-mocha)
2. [Karma Mocha Chai React example](/6.2-karma-mocha-chai)

### My experiments

1. [Reddit w/ Router, SCSS, DevTools](/9.1-mash)
2. [Comments w/ Redux, Router, Bootstrap, DevTools, Parse API](/9.2-my-comments)

### Demo

http://saltycrane.github.io/react-learning/

### Other Resources

 - [You Don't Know JS: ES6 & Beyond](https://github.com/getify/You-Dont-Know-JS/tree/master/es6%20%26%20beyond)
 - [A cartoon guide to Flux](https://code-cartoons.com/a-cartoon-guide-to-flux-6157355ab207#.1suzo07zg)
 - [https://github.com/happypoulp/redux-tutorial](https://github.com/happypoulp/redux-tutorial)
 - [Understanding Redux (or, How I Fell in Love with a JavaScript State Container)](http://www.youhavetolearncomputers.com/blog/2015/9/15/a-conceptual-overview-of-redux-or-how-i-fell-in-love-with-a-javascript-state-container)
 - [React Conf Europe 2015 videos](https://www.youtube.com/channel/UCorlLn2oZfgOJ-FUcF2eZ1A/playlists)
 - [Dan Abramov's Getting Started with Redux course](https://egghead.io/series/getting-started-with-redux)
