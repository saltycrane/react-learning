import React, { Component } from "react";


class DeletableImage extends Component {
    render() {
        const { image, commentObj, actions } = this.props;

        return (
            <div className="img-container">
                <img
                    src={image.file.url}
                    height="150px"
                />
                <span
                    className="btn-delete btn btn-default"
                    onClick={() => actions.deleteImage(image.objectId, commentObj)}
                >
                    <i className="fa fa-times"></i>
                </span>
            </div>
        );
    }
}

export default class ImageForm extends Component {
    constructor(props) {
        super(props);
        this._handleFileChange = this._handleFileChange.bind(this);
    }
    _handleFileChange(e) {
        const { commentObj, actions } = this.props;
        const file = e.target.files[0];
        actions.saveImage(file, commentObj.objectId);
    }
    _renderFileInput() {
        const { commentObj } = this.props;

        if (commentObj.objectId) {
            return (
                <div className="form-group">
                    <label>Add Image</label>
                    <input
                        className="form-control"
                        type="file"
                        onChange={this._handleFileChange}
                        ref={(c) => this._fileInput = c}
                    />
                </div>
            );
        } else {
            return null;
        }
    }
    _renderImages() {
        const { commentObj, images, actions } = this.props;
        let savedImages = null;
        let unsavedImages = null;

        if (commentObj.images) {
            savedImages = commentObj.images.map(function(image) {
                return (
                    <DeletableImage
                        key={image.objectId}
                        image={image}
                        commentObj={commentObj}
                        actions={actions}
                    />
                );
            });
        }
        if (images) {
            unsavedImages = images.map(function(image) {
                return (
                    <DeletableImage
                        key={image.objectId}
                        image={image}
                        commentObj={commentObj}
                        actions={actions}
                    />
                );
            });
        }
        return (
            <div>
                {savedImages}
                {unsavedImages}
            </div>
        );
    }
    render() {
        return (
            <div>
                {this._renderFileInput()}
                {this._renderImages()}
            </div>
        );
    }
}
