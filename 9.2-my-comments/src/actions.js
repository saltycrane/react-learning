import * as parse from "./parse-api";

export const REQUEST_COMMENTS = "REQUEST_COMMENTS";
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const POST_COMMENT = "POST_COMMENT";

function requestComments() {
    return {
        type: REQUEST_COMMENTS
    };
}

function receiveComments(json) {
    return {
        type: RECEIVE_COMMENTS,
        comments: json,
        receivedAt: Date.now()
    };
}

function postComment(comment) {
    return {
        type: POST_COMMENT,
        comment: comment
    };
}

export function fetchComments() {
    return dispatch => {
        dispatch(requestComments());
        parse.getComments(results => dispatch(receiveComments(results)));
    };
}

export function submitComment(comment) {
    return dispatch => {
        dispatch(postComment(comment));
        // The second argument, `() => dispatch(fetchComments())` is used
        // to update the comment list after the comment is POSTed successfully.
        // TODO: change to only add the new comment to the list instead
        // of re-requesting the whole list.
        parse.saveComment(comment, () => dispatch(fetchComments()));
    };
}
