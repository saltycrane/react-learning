import React, { Component } from "react";
import { Link } from "react-router";
import marked from "marked";

import CommentForm from "./CommentForm";

export default class Comment extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            editing: false
        };
        this._handleEdit = this._handleEdit.bind(this);
        this._handleCancel = this._handleCancel.bind(this);
        this._handleSave = this._handleSave.bind(this);
    }
    _rawMarkup() {
        const { commentObj } = this.props;
        var rawMarkup = marked(commentObj.text.toString(), {sanitize: true});
        return { __html: rawMarkup };
    }
    _renderViewButton() {
        const { commentObj, isDetailView = false } = this.props;

        if (isDetailView) { return null; }

        // TODO: maybe this should be passed in as a prop
        return (
            <Link
                className="btn btn-default"
                to={`/comments/${commentObj.objectId}`}
            >View</Link>
        );
    }
    _handleEdit() {
        this.setState({ editing: true });
    }
    _handleCancel() {
        this.setState({ editing: false });
    }
    // wrap the `onSave` callback passed in the props from the parent
    // so that we can set the state { editing: false }. is there is a better way?
    _handleSave(newCommentObj) {
        const { onSave } = this.props;
        onSave(newCommentObj);
        this.setState({ editing: false });
    }
    render() {
        const { commentObj, onDelete } = this.props;
        let element;

        if (this.state.editing) {
            // display form for editing
            element = (
                <div>
                    <div className="comment-metadata">
                        created {commentObj.createdAt}
                        &nbsp;|&nbsp;
                        updated {commentObj.updatedAt}
                    </div>
                    <CommentForm
                        commentObj={commentObj}
                        onSave={this._handleSave} />
                    <button
                        className="btn btn-default"
                        onClick={this._handleCancel}
                    >Cancel</button>
                </div>
            );
        } else {
            // display comment
            let locationElement = null;

            if (commentObj.location) {
                let mapUrl = `http://maps.googleapis.com/maps/api/staticmap?size=200x200&zoom=12&markers=color:red|${commentObj.location}`;
                locationElement = (
                    <div>
                        <img src={mapUrl} />
                        <div className="comment-metadata">
                            Location: {commentObj.location}
                        </div>
                    </div>
                );
            }
            element = (
                <div className="row">
                    <div className="col-sm-8">
                        <h5>
                            {commentObj.author}&nbsp;
                            <small>
                                created {commentObj.createdAt}
                                &nbsp;|&nbsp;
                                updated {commentObj.updatedAt}
                            </small>
                        </h5>
                        <span dangerouslySetInnerHTML={this._rawMarkup()} />
                        <div className="margin-md-bottom">
                            <button
                                className="btn btn-default"
                                onClick={onDelete.bind(null, commentObj.objectId)}
                            >Delete</button>
                            {this._renderViewButton()}
                            <button
                                className="btn btn-default"
                                onClick={this._handleEdit}
                            >Edit</button>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        {locationElement}
                    </div>
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
