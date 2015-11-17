import * as parse from "./parse-api";

export const REQUEST_COMMENTS = "REQUEST_COMMENTS";
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const POST_COMMENT = "POST_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

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

function _deleteComment(id) {
    return {
        type: DELETE_COMMENT,
        id: id
    };
}

export function fetchComments() {
    return dispatch => {
        dispatch(_requestComments());
        parse.getComments(results => dispatch(_receiveComments(results)));
    };
}

export function submitComment(comment) {
    return dispatch => {
        dispatch(_postComment(comment));
        // The second argument, `() => dispatch(fetchComments())` is used
        // to update the comment list after the comment is POSTed successfully.
        // TODO: change to only add the new comment to the list instead
        // of re-requesting the whole list.
        parse.saveComment(comment, () => dispatch(fetchComments()));
    };
}

export function deleteComment(id) {
    return dispatch => {
        dispatch(_deleteComment(id));
        parse.deleteComment(id, () => dispatch(fetchComments()));
    };
}
