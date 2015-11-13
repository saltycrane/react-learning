// Do this once before any other code in your appearance (from Section 3.1, Note on fetch)
// Note the docs said to add `import "babel-core/polyfill"` but I couldn't get that to work and found https://babeljs.io/docs/usage/polyfill/ instead
import "babel-polyfill";

import React from "react";
import { render } from "react-dom";
import Root from "./containers/Root";

render(
    <Root />,
    document.getElementById("root")
);
