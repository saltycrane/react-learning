/* global __DEV__ */
import React, { Component } from "react";
import { Provider } from "react-redux";
// React components for Redux DevTools
import { DevTools, DebugPanel, LogMonitor } from "redux-devtools/lib/react";
import { Router, Route, Link } from "react-router";

import configureStore from "../configureStore";
import AsyncApp from "./AsyncApp";

const store = configureStore();

class ToDoApp extends Component {
    render() {
        return <h2>To Do App</h2>;
    }
}

class App extends Component {
    render() {
        return (
            <div>
                <h1>App</h1>
                <ul>
                    <li><Link to="/todo">To Do App</Link></li>
                    <li><Link to="/reddit">Reddit App</Link></li>
                </ul>
                {this.props.children}
            </div>
        );
    }
}

export default class Root extends Component {
    render() {
        let devTools = null;

        if (__DEV__) {
            devTools = (
                <DebugPanel top right bottom>
                    <DevTools store={store} monitor={LogMonitor} />
                </DebugPanel>
            );
        }

        return (
            <div>
                <Provider store={store}>
                    <Router>
                        <Route path="/" component={App}>
                            <Route path="todo" component={ToDoApp} />
                            <Route path="reddit" component={AsyncApp} />
                        </Route>
                    </Router>
                </Provider>
                {devTools}
            </div>
        );
    }
}
