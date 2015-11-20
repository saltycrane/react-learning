import * as parse from "./parse-api";

export const REQUEST_COMMENTS = "REQUEST_COMMENTS";
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const SAVE_COMMENT = "SAVE_COMMENT";
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

// ================
// private functions
// ================
function _requestComments() {
    return {
        type: REQUEST_COMMENTS
    };
}

function _receiveComments(json) {
    return {
        type: RECEIVE_COMMENTS,
        comments: json,
        receivedAt: Date.now()
    };
}

function _saveComment(comment) {
    return {
        type: SAVE_COMMENT,
        comment: comment
    };
}

function _receiveComment(comment) {
    return {
        type: RECEIVE_COMMENT,
        comment: comment
    };
}

function _deleteComment(id) {
    return {
        type: DELETE_COMMENT,
        id: id
    };
}

function _actuallyFetchComments() {
    return dispatch => {
        dispatch(_requestComments());
        parse.getComments(results => dispatch(_receiveComments(results)));
    };
}

function _shouldFetch(state) {
    const { comments } = state;

    if (comments.isFetching) {
        return false;
    } else if (comments.items.length > 0) {
        // assume the API always returns data.
        // if this is not the case, add another flag, `hydrated`, or something
        return false;
    } else {
        return true;
    }
}

// ================
// public functions
// ================
export function fetchComments() {
    // fetch comments if not already cached
    return (dispatch, getState) => {
        if (_shouldFetch(getState())) {
            return dispatch(_actuallyFetchComments());
        } else {
            return Promise.resolve();
        }
    };
}

export function saveComment(comment) {
    return dispatch => {
        dispatch(_saveComment(comment));
        parse.saveComment(comment, result => dispatch(_receiveComment(result)));
    };
}

export function deleteComment(id) {
    return dispatch => {
        dispatch(_deleteComment(id));
        parse.deleteComment(id);
    };
}
