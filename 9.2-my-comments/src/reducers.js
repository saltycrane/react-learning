import {
    REQUEST_COMMENTS,
    RECEIVE_COMMENTS,
    RECEIVE_COMMENT,
    DELETE_COMMENT
} from "./actions";

function comments(state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) {
    let isNewComment;
    let newItems;

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
            // this action occurs after receiving the response from the API after saving a comment
            isNewComment = !state.items.some(
                item => item.objectId === action.comment.objectId);
            if (isNewComment) {
                // if adding a new comment, add the new comment to the list
                newItems = [...state.items, action.comment];
            } else {
                // if editing an existing comment, replace the old comment with the new comment
                newItems = state.items.reduce(function (memo, item) {
                    if (item.objectId === action.comment.objectId) {
                        memo.push(action.comment);
                    } else {
                        memo.push(item);
                    }
                    return memo;
                }, []);
            }
            return Object.assign({}, state, {
                items: newItems
            });
        case DELETE_COMMENT:
            // remove a comment from the list after deleting
            // NOTE: this does not wait for confirmation from the API
            return Object.assign({}, state, {
                items: state.items.filter(item => item.objectId !== action.id)
            });
        default:
            return state;
    }
}

export default function rootReducer(state = {}, action) {
    return {
        comments: comments(state.comments, action)
    };
}
