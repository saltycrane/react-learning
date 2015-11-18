import {
    REQUEST_COMMENTS,
    RECEIVE_COMMENTS,
    RECEIVE_COMMENT,
    DELETE_COMMENT,
    SELECT_COMMENT
} from "./actions";

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
        case RECEIVE_COMMENT:
            // add a single comment to the list after posting
            // NOTE: this occurs after receiving the response from the API
            return Object.assign({}, state, {
                items: [...state.items, action.comment]
            });
        case DELETE_COMMENT:
            // remove a comment from the list after deleting
            // NOTE: this does not wait for confirmation from the API
            return Object.assign({}, state, {
                items: state.items.reduce(function(memo, item) {
                    if (item.objectId !== action.id) {
                        memo.push(item);
                    }
                    return memo;
                }, [])
            });
        case SELECT_COMMENT:
            return Object.assign({}, state, {
                selectedCommentId: action.id
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
