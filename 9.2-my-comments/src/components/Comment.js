import React, { Component } from "react";
import { Link } from "react-router";
import marked from "marked";

import StaticMap from "./StaticMap";
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
                    <div className="pull-right">
                        <StaticMap location={commentObj.location} />
                    </div>
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
