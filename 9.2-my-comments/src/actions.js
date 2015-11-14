import fetch from "isomorphic-fetch";

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
        return fetch("/api/comments")
            .then(res => res.json())
            .then(json => dispatch(receiveComments(json)));
    };
}

export function submitComment(comment) {
    return dispatch => {
        dispatch(postComment(comment));
        return fetch("/api/comments", {
            method: "post",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        }).then(res => res.json())
            .then(json => dispatch(receiveComments(json)));
    };
}
