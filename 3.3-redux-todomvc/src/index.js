import "todomvc-app-css/index.css";
import "babel-polyfill";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { DevTools, DebugPanel, LogMonitor } from "redux-devtools/lib/react";

import App from "./containers/App";
import configureStore from "./configureStore";

const store = configureStore();

render(
    <div>
        <Provider store={store}>
            <App />
        </Provider>
        <DebugPanel top right bottom>
            <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
    </div>,
    document.getElementById("root")
);
