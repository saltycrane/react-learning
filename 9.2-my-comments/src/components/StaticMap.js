import React, { Component } from "react";


export default class StaticMap extends Component {
    render() {
        const { location } = this.props;
        let locationElement = null;

        if (location) {
            let mapUrl = `http://maps.googleapis.com/maps/api/staticmap?size=275x275&zoom=12&markers=color:red|${location}`;
            locationElement = (
                <div>
                    <a href={`https://www.google.com/maps/place/${location}`}>
                        <img src={mapUrl} className="img-responsive" />
                        <div className="comment-metadata">
                            Location: {location}
                        </div>
                    </a>
                </div>
            );
        }
        return locationElement;
    }
}
