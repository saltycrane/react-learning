/* global __DEV__ */
import { createStore, applyMiddleware, compose } from "redux";
// Redux DevTools store enhancers
import { devTools, persistState } from "redux-devtools";
import thunkMiddleware from "redux-thunk";
import createLogger from "redux-logger";
import rootReducer from "./reducers";

let finalCreateStore;
const loggerMiddleware = createLogger();

if (__DEV__) {
    finalCreateStore = compose(
        applyMiddleware(
            thunkMiddleware,  // lets us dispatch() functions
            loggerMiddleware  // neat middleware that logs actions
        ),
        devTools(),
        persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore);
} else {
    finalCreateStore = applyMiddleware(
        thunkMiddleware
    )(createStore);
}

export default function configureStore(initialState) {
    return finalCreateStore(rootReducer, initialState);
}
