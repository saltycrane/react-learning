import { REQUEST_COMMENTS, RECEIVE_COMMENTS } from "./actions";

function dummy(state, action) {
    return state;
}

function comments(state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) {
    switch (action.type) {
        case REQUEST_COMMENTS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case RECEIVE_COMMENTS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.comments,
                lastUpdated: action.receivedAt
            });
        default:
            return state;
    }
}

export default function rootReducer(state = {}, action) {
    return {
        comments: comments(state.comments, action),
        dummy: dummy(state.dummy, action)
    };
}
