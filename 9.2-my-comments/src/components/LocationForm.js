import React, { Component } from "react";

import StaticMap from "./StaticMap";


export default class LocationForm extends Component {
    constructor(props) {
        super(props);
        const { initialLocationText } = props;
        this.state = {
            lat: null,
            lon: null,
            locationText: initialLocationText,
            prevLocationText: initialLocationText
        };
        this._handleLocationChange = this._handleLocationChange.bind(this);
        this._handleGetLocation = this._handleGetLocation.bind(this);
        this._handleUndo = this._handleUndo.bind(this);
    }
    componentDidMount() {
        this._getLocation();
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
    _handleLocationChange(e) {
        this.setState({locationText: e.target.value});
    }
    _handleGetLocation(e) {
        e.preventDefault();
        this._getLocation();
        const locationText = this.state.lat + "," + this.state.lon;
        this.setState({
            prevLocationText: this.state.locationText,
            locationText: locationText
        });
    }
    _handleUndo(e) {
        e.preventDefault();
        this.setState({locationText: this.state.prevLocationText});
    }
    render() {
        const { locationText } = this.state;
        return (
            <div className="row">
                <div className="col-md-6">
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
                                className="btn btn-default margin-sm-right"
                                onClick={this._handleGetLocation}
                            >Get Location</button>
                            <button
                                className="btn btn-default"
                                onClick={this._handleUndo}
                            >Undo</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <StaticMap location={locationText} />
                </div>
            </div>
        );
    }
    // called by owner component via this.refs
    // https://facebook.github.io/react/tips/expose-component-functions.html
    // TODO: better way?
    getValue() {
        return this._locationInput.value.trim();
    }
}
