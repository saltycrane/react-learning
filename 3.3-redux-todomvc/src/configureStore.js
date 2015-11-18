import { createStore, applyMiddleware, compose } from "redux";
import { devTools, persistState } from "redux-devtools";
import createLogger from "redux-logger";

import rootReducer from "./reducers";

const loggerMiddleware = createLogger();

const finalCreateStore = compose(
    applyMiddleware(
        loggerMiddleware
    ),
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

export default function configureStore(initialState) {
    return finalCreateStore(rootReducer, initialState);
}
