import {
    REQUEST_COMMENTS,
    RECEIVE_COMMENTS,
    RECEIVE_COMMENT,
    DELETE_COMMENT,
    RECEIVE_IMAGE,
    DELETE_IMAGE
} from "./actions";


/*
const EXAMPLE_STATE = {
    comments: {
        isFetching: false,
        didInvalidate: false,
        lastUpdated: 1448318665021,
        items: [
            {
                objectId: "byBV4Yb7F9",
                author: "Me",
                text: "Hi",
                images: [
                    {
                        objectId: "lpN2G3wazs",
                        commentId: "byBV4Yb7F9",
                        file: {
                            name: "tfss-f20185b0-4ea0-4254-8860-77c1f1f64a64-richard-stallman.jpg",
                            url: "http://files.parsetfss.com/815d9717-05cc-4d08-8536-886b4e3cc597/tfss-f20185b0-4ea0-4254-8860-77c1f1f64a64-richard-stallman.jpg"
                        },
                        createdAt: "",
                        updatedAt: ""
                    }
                ],
                createdAt: "2015-11-23T21:23:41.838Z",
                updatedAt: "2015-11-23T21:23:41.838Z",
            }
        ]
    },

    // images are only for a single selected comment
    images: {
        items: [
            {
                objectId: "lpN2G3wazs",
                commentId: "byBV4Yb7F9",
                file: {
                    name: "tfss-f20185b0-4ea0-4254-8860-77c1f1f64a64-richard-stallman.jpg",
                    url: "http://files.parsetfss.com/815d9717-05cc-4d08-8536-886b4e3cc597/tfss-f20185b0-4ea0-4254-8860-77c1f1f64a64-richard-stallman.jpg"
                },
                createdAt: "",
                updatedAt: ""
            }
        ]
    }
};
*/

function _updateItem(items, id, update) {
    // update an item given the id and new properties and values.
    // using map and Object.assign to avoid mutating state.
    return items.map(function (item) {
        if (item.objectId === id) {
            return Object.assign({}, item, update);
        } else {
            return item;
        }
    });
}

function comments(state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) {
    let isNewComment;
    let comments;
    let comment;

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
            comment = action.comment;
            isNewComment = !state.items.some(
                item => item.objectId === comment.objectId);
            if (isNewComment) {
                // if adding a new comment, add the new comment to the list
                comments = [...state.items, comment];
            } else {
                // if editing an existing comment, replace the old comment with the new comment
                comments = _updateItem(state.items, comment.objectId, comment);
            }
            return Object.assign({}, state, {
                items: comments
            });
        case DELETE_COMMENT:
            // remove a comment from the list after deleting
            // NOTE: this does not wait for confirmation from the API
            return Object.assign({}, state, {
                items: state.items.filter(item => item.objectId !== action.id)
            });
        case DELETE_IMAGE:
            // remove image from the comment's images list.
            return Object.assign({}, state, {
                items: _updateItem(state.items, action.comment.objectId, action.comment)
            });
        default:
            return state;
    }
}

// images that have not been "saved" with the comment
// these images are associated only with the single comment being edited
function images(state = {
    items: []
}, action) {
    let images;

    switch (action.type) {
        case RECEIVE_IMAGE:
            images = [...state.items, action.image];
            return Object.assign({}, state, {
                items: images
            });
        case RECEIVE_COMMENT:
            // after saving a comment, clear the list of unsaved images
            return Object.assign({}, state, {
                items: []
            });
        case DELETE_IMAGE:
            // remove an image from the list after deleting
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
        comments: comments(state.comments, action),
        images: images(state.images, action)
    };
}
