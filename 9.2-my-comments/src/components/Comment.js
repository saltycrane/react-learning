import React, { Component } from "react";
import { Link } from "react-router";
import marked from "marked";
import moment from "moment";

import CommentForm from "./CommentForm";


function formatDate(isodate) {
    return moment(isodate).format("YYYY-MM-DD h:mm a");
}

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
    _renderActionButtons() {
        const { commentObj, actions, isDetailView = false } = this.props;

        if (isDetailView) {
            return (
                <div>
                    <button
                        className="btn btn-default margin-md-right"
                        onClick={() => actions.deleteComment(commentObj.objectId)}
                    >Delete</button>
                    <button
                        className="btn btn-default"
                        onClick={() => actions.editComment(commentObj.objectId)}
                    >Edit</button>
                </div>
            );
        } else {
            return (
                <div>
                    <button
                        className="btn btn-default margin-md-right"
                        onClick={() => actions.deleteComment(commentObj.objectId)}
                    >Delete</button>
                    <Link
                        className="btn btn-default"
                        to={`/comments/${commentObj.objectId}`}
                    >View</Link>
                </div>
            );
        }
    }
    render() {
        const { commentObj, images, actions } = this.props;
        let element;

        if (commentObj.isEditing) {
            // display form for editing
            element = (
                <div>
                    <div className="comment-metadata margin-md-bottom">
                        created {formatDate(commentObj.createdAt)}
                        &nbsp;|&nbsp;
                        updated {formatDate(commentObj.updatedAt)}
                    </div>
                    <div className="margin-md-bottom">
                        <CommentForm
                            commentObj={commentObj}
                            images={images}
                            actions={actions}
                        />
                    </div>
                    <button
                        className="btn btn-default"
                        onClick={() => actions.cancelEditComment(commentObj.objectId)}
                    >Cancel</button>
                </div>
            );
        } else {
            // display comment
            element = (
                <div className="clearfix">
                    <h5>
                        {commentObj.author}&nbsp;
                        <small>
                            created {formatDate(commentObj.createdAt)}
                            &nbsp;|&nbsp;
                            updated {formatDate(commentObj.updatedAt)}
                        </small>
                    </h5>
                    {this._renderMap()}
                    <span dangerouslySetInnerHTML={this._rawMarkup()} />
                    <div className="margin-md-bottom">
                        {this._renderImages()}
                    </div>
                    {this._renderActionButtons()}
                </div>
            );
        }

        return (
            <div className="comment well">
                {element}
            </div>
        );
    }
}
