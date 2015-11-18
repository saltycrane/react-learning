import * as parse from "./parse-api";

export const REQUEST_COMMENTS = "REQUEST_COMMENTS";
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const POST_COMMENT = "POST_COMMENT";
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const SELECT_COMMENT = "SELECT_COMMENT";

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

function _postComment(comment) {
    return {
        type: POST_COMMENT,
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

export function submitComment(comment) {
    return dispatch => {
        dispatch(_postComment(comment));
        parse.saveComment(comment, result => dispatch(_receiveComment(result)));
    };
}

export function deleteComment(id) {
    return dispatch => {
        dispatch(_deleteComment(id));
        parse.deleteComment(id);
    };
}

// not used at the moment
export function selectComment(id) {
    return {
        type: SELECT_COMMENT,
        id: id
    };
}
