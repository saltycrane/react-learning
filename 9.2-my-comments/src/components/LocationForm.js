import React, { Component } from "react";

import StaticMap from "./StaticMap";


export default class LocationForm extends Component {
    constructor(props) {
        super(props);
        this._handleLocationChange = this._handleLocationChange.bind(this);
    }
    componentDidMount() {
        const { initialLocationText, actions } = this.props;
        actions.setLocationFromUserInput(initialLocationText);
        actions.getLocation();
    }
    _handleLocationChange(e) {
        const { actions } = this.props;
        actions.setLocationFromUserInput(e.target.value);
    }
    render() {
        const {
            location: {
                text: locationText
            },
            actions
        } = this.props;

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
                                type="button"
                                onClick={actions.setLocationFromDetected}
                            >Get Location</button>
                            <button
                                className="btn btn-default"
                                type="button"
                                onClick={actions.undoSetLocation}
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
