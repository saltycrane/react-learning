import * as parse from "./parse-api";

export const REQUEST_COMMENTS = "REQUEST_COMMENTS";
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const SAVE_COMMENT = "SAVE_COMMENT";
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const CANCEL_EDIT_COMMENT = "CANCEL_EDIT_COMMENT";
export const SAVE_IMAGE = "SAVE_IMAGE";
export const RECEIVE_IMAGE = "RECEIVE_IMAGE";
export const DELETE_IMAGE = "DELETE_IMAGE";

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

function _receiveImage(image) {
    return {
        type: RECEIVE_IMAGE,
        image: image
    };
}

function _deleteImage(id, comment) {
    return {
        type: DELETE_IMAGE,
        id: id,
        comment: comment
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
export function editComment(id) {
    return {
        type: EDIT_COMMENT,
        id: id
    };
}

export function cancelEditComment(id) {
    return {
        type: CANCEL_EDIT_COMMENT,
        id: id
    };
}

// fetch comments if not already cached
export function fetchComments() {
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

        // remove properties from the redux state that I don't want to save to Parse.
        // TODO: how to handle this better?
        delete comment.isEditing;

        parse.saveComment(comment, result => dispatch(_receiveComment(result)));
    };
}

export function deleteComment(id) {
    return dispatch => {
        dispatch(_deleteComment(id));
        parse.deleteComment(id);
    };
}

export function saveImage(file, commentId) {
    return dispatch => {
        // dispatch(_saveImage(file, commentId));
        parse.saveImage(file, commentId, image => dispatch(_receiveImage(image)));
    };
}

// delete the Image row and update the Comment images list
export function deleteImage(id, comment) {
    const images = comment.images.filter(item => item.objectId !== id);
    let newComment = Object.assign({}, comment, {
        images: images
    });

    return dispatch => {
        dispatch(_deleteImage(id, newComment));
        parse.deleteImage(id);

        delete newComment.isEditing;

        parse.saveComment(newComment);
    };
}
