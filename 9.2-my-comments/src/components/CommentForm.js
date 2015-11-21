import React, { Component } from "react";

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
        // get user's location
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({
                lat: position.coords.latitude,
                lon: position.coords.longitude
            });
        });
    }
    _handleSave(e) {
        e.preventDefault();
        const { commentObj, onSave } = this.props;
        const author = this._authorInput.value.trim();
        const text = this._textInput.value.trim();
        const location = this._locationInput.value.trim();
        const newCommentObj = Object.assign({}, commentObj, {
            author: author,
            text: text,
            location: location
        });

        if (!text || !author) {
            return;
        }
        onSave(newCommentObj);
        this._authorInput.value = "";
        this._textInput.value = "";
    }
    _handleGetLocation(e) {
        e.preventDefault();
        const locationText = this.state.lat + "," + this.state.lon;
        this.setState({locationText: locationText});
    }
    _handleLocationChange(e) {
        this.setState({locationText: e.target.value});
    }
    render() {
        const { commentObj } = this.props;
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
                <div className="form-group">
                    <label>Location</label>
                    <input
                        className="form-control"
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
                <button className="btn btn-primary" type="submit">Save</button>
            </form>
        );
    }
}
