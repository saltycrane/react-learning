import React, { Component } from "react";

import ImageForm from "./ImageForm";
import LocationForm from "./LocationForm";
import history from "../history";


function _union(first, second, key) {
    // merge the two arrays ensuring each item is unique (based on key)
    // better way to do this?
    const merged = [...first, ...second];
    const vals = merged.map(item => item[key]);
    const uniqueVals = [...(new Set(vals))];

    return uniqueVals.map(function (val) {
        return merged.find(item => item[key] === val);
    });
}

export default class CommentForm extends Component {
    constructor(props) {
        super(props);
        this._handleSave = this._handleSave.bind(this);
    }
    _handleSave(e) {
        e.preventDefault();
        const { commentObj, images, actions, isEditView = false } = this.props;
        const author = this._authorInput.value.trim();
        const text = this._textInput.value.trim();
        const location = this._locationForm.getValue();
        let allImages;

        // TODO: perform the union in reducers.js
        // get the union of the existing images and the newly added images
        if (commentObj.images) {
            allImages = _union(commentObj.images, images, "objectId");
        } else {
            allImages = images;
        }

        const newCommentObj = Object.assign({}, commentObj, {
            author: author,
            text: text,
            location: location,
            images: allImages
        });

        if (!text || !author) {
            return;
        }
        actions.saveComment(newCommentObj);
        this._authorInput.value = "";
        this._textInput.value = "";
        if (isEditView) {
            history.goBack();
        }
    }
    render() {
        const { commentObj, images, actions, isEditView = false } = this.props;
        let cancelButton = null;

        if (isEditView) {
            cancelButton = (
                <span
                    className="btn btn-default margin-md-right"
                    onClick={history.goBack}
                >Cancel</span>
            );
        }

        return (
            <form onSubmit={this._handleSave}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Your name"
                        defaultValue={commentObj.author}
                        ref={(c) => this._authorInput = c} />
                </div>
                <div className="form-group">
                    <label>Comment</label>
                    <textarea
                        className="form-control"
                        rows="5"
                        type="text"
                        placeholder="Say something..."
                        defaultValue={commentObj.text}
                        ref={(c) => this._textInput = c} />
                </div>
                <LocationForm
                    initialLocationText={commentObj.location}
                    ref={(c) => this._locationForm = c}
                />
                <div className="margin-md-bottom">
                    <ImageForm
                        commentObj={commentObj}
                        images={images}
                        actions={actions}
                    />
                </div>
                {cancelButton}
                <button className="btn btn-primary" type="submit">Save</button>
            </form>
        );
    }
}
