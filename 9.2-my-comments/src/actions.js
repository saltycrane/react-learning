import history from "./history";

import * as parse from "./parse-api";


export const REQUEST_COMMENTS = "REQUEST_COMMENTS";
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const SAVE_COMMENT = "SAVE_COMMENT";
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const SAVE_IMAGE = "SAVE_IMAGE";
export const RECEIVE_IMAGE = "RECEIVE_IMAGE";
export const DELETE_IMAGE = "DELETE_IMAGE";
export const GET_LOCATION = "GET_LOCATION";
export const GET_LOCATION_SUCCESS = "GET_LOCATION_SUCCESS";
export const SET_LOCATION_FROM_USER_INPUT = "SET_LOCATION_FROM_USER_INPUT";
export const SET_LOCATION_FROM_DETECTED = "SET_LOCATION_FROM_DETECTED";
export const UNDO_SET_LOCATION = "UNDO_SET_LOCATION";

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

function _getLocation() {
    return {
        type: GET_LOCATION
    };
}

// coords: {latitude, longitude}
function _getLocationSuccess(coords) {
    return {
        type: GET_LOCATION_SUCCESS,
        lat: coords.latitude,
        lon: coords.longitude
    };
}

// ================
// public functions
// ================
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
        parse.saveComment(comment, result => dispatch(_receiveComment(result)));
    };
}

export function deleteComment(id, isDetailView = false) {
    return dispatch => {
        dispatch(_deleteComment(id));
        if (isDetailView) {
            history.goBack();
        }
        parse.deleteComment(id);
    };
}

export function saveImage(file, commentId) {
    return dispatch => {
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
        parse.saveComment(newComment);
    };
}

// locationText: string
export function setLocationFromUserInput(locationText) {
    return {
        type: SET_LOCATION_FROM_USER_INPUT,
        locationText: locationText
    };
}

export function setLocationFromDetected() {
    // perform a getLocation() for next time around.
    // not sure the best way to handle this.
    getLocation();

    return {
        type: SET_LOCATION_FROM_DETECTED
    };
}

export function undoSetLocation() {
    return {
        type: UNDO_SET_LOCATION
    };
}

export function getLocation() {
    return dispatch => {
        dispatch(_getLocation());
        navigator.geolocation.getCurrentPosition(
            position => {
                dispatch(_getLocationSuccess(position.coords));
            },
            err => {
                console.error(`ERROR(${err.code}): ${err.message}`);
            },
            {
                enableHighAccuracy: true
            }
        );
    };
}
