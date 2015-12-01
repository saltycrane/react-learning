import React, { Component } from "react";

import ImageForm from "./ImageForm";


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
        this.state = {
            lat: null,
            lon: null,
            locationText: undefined
        };
        this._handleSave = this._handleSave.bind(this);
        this._handleGetLocation = this._handleGetLocation.bind(this);
        this._handleLocationChange = this._handleLocationChange.bind(this);
    }
    componentDidMount() {
        this._getLocation();
    }
    _handleSave(e) {
        e.preventDefault();
        const { commentObj, images, actions } = this.props;
        const author = this._authorInput.value.trim();
        const text = this._textInput.value.trim();
        const location = this._locationInput.value.trim();
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
    }
    _getLocation() {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                });
            },
            err => {
                console.error(`ERROR(${err.code}): ${err.message}`);
            },
            {
                enableHighAccuracy: true
            }
        );
    }
    _handleGetLocation(e) {
        e.preventDefault();
        this._getLocation();
        const locationText = this.state.lat + "," + this.state.lon;
        this.setState({locationText: locationText});
    }
    _handleLocationChange(e) {
        this.setState({locationText: e.target.value});
    }
    render() {
        const { commentObj, images, actions } = this.props;
        const { locationText = commentObj.location } = this.state;

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
                <label>Location</label>
                <div className="margin-md-bottom">
                    <div className="form-group">
                        <input
                            className="form-control margin-sm-bottom"
                            type="text"
                            value={locationText}
                            onChange={this._handleLocationChange}
                            ref={(c) => this._locationInput = c}
                        />
                        <button
                            className="btn btn-default"
                            onClick={this._handleGetLocation}
                        >Get Location</button>
                    </div>
                </div>
                <div className="margin-md-bottom">
                    <ImageForm
                        commentObj={commentObj}
                        images={images}
                        actions={actions}
                    />
                </div>
                <button className="btn btn-primary" type="submit">Save</button>
            </form>
        );
    }
}
