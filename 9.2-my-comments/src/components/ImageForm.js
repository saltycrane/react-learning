import React, { Component } from "react";


class DeletableImage extends Component {
    render() {
        const { image, onDelete } = this.props;

        return (
            <div className="img-container">
                <img
                    src={image.file.url}
                    height="150px"
                />
                <span
                    className="btn-delete btn btn-default"
                    onClick={onDelete}
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
        const { actions } = this.props;
        const file = e.target.files[0];
        actions.saveImage(file);
    }
    _renderFileInput() {
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
                        onDelete={() => actions.deleteSavedImage(image.objectId, commentObj)}
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
                        onDelete={() => actions.deleteUnsavedImage(image.objectId)}
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
