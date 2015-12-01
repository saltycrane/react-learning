import React, { Component } from "react";
import { Link } from "react-router";
import marked from "marked";

import * as util from "../util";


export default class Comment extends Component {
    _rawMarkup() {
        const { commentObj } = this.props;
        let rawMarkup = null;

        if (commentObj.text) {
            rawMarkup = marked(commentObj.text.toString(), {sanitize: true});
        }
        return { __html: rawMarkup };
    }
    _renderMap() {
        const { commentObj } = this.props;
        let locationElement = null;

        if (commentObj.location) {
            let mapUrl = `http://maps.googleapis.com/maps/api/staticmap?size=275x275&zoom=12&markers=color:red|${commentObj.location}`;
            locationElement = (
                <div className="pull-right">
                    <a href={`https://www.google.com/maps/place/${commentObj.location}`}>
                        <img src={mapUrl} className="img-responsive" />
                        <div className="comment-metadata">
                            Location: {commentObj.location}
                        </div>
                    </a>
                </div>
            );
        }
        return locationElement;
    }
    _renderImages() {
        const { commentObj } = this.props;
        let element = null;

        if (commentObj.images) {
            element = commentObj.images.map(function(image) {
                return (
                    <a href={image.file.url} key={image.objectId}>
                        <img
                            src={image.file.url}
                            height="150px"
                        />
                    </a>
                );
            });
        }
        return element;
    }
    render() {
        const { commentObj, actions, isDetailView = false } = this.props;
        let viewButton = null;

        if (!isDetailView) {
            viewButton = (
                <Link
                    className="btn btn-default"
                    to={`/comments/${commentObj.objectId}`}
                >View</Link>
            );
        }

        return (
            <div className="comment well">
                <div className="clearfix">
                    <h5>
                        {commentObj.author}&nbsp;
                        <small>
                            created {util.formatDate(commentObj.createdAt)}
                            &nbsp;|&nbsp;
                            updated {util.formatDate(commentObj.updatedAt)}
                        </small>
                    </h5>
                    {this._renderMap()}
                    <span dangerouslySetInnerHTML={this._rawMarkup()} />
                    <div className="margin-md-bottom">
                        {this._renderImages()}
                    </div>
                    <div>
                        <button
                            className="btn btn-default margin-md-right"
                            onClick={() => actions.deleteComment(commentObj.objectId, isDetailView)}
                        >Delete</button>
                        <Link
                            className="btn btn-default margin-md-right"
                            to={`/comments/${commentObj.objectId}/edit`}
                        >Edit</Link>
                        {viewButton}
                    </div>
                </div>
            </div>
        );
    }
}
