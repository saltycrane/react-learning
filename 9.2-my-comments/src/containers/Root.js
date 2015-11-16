/* global __DEV__ */

import React, { Component } from "react";
import { Provider } from "react-redux";
import { DevTools, DebugPanel, LogMonitor } from "redux-devtools/lib/react";

import configureStore from "../configureStore";
import AsyncApp from "./AsyncApp";


const store = configureStore();


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
                    <AsyncApp />
                </Provider>
                {devTools}
            </div>
        );
    }
}
