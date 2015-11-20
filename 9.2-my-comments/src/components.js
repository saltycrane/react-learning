import marked from "marked";
import React, { Component } from "react";
import { Link } from "react-router";

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this._handleSave = this._handleSave.bind(this);
    }
    _handleSave(e) {
        e.preventDefault();
        const { commentObj, onSave } = this.props;
        const author = this._authorInput.value.trim();
        const text = this._textInput.value.trim();
        const newCommentObj = Object.assign({}, commentObj, {author: author, text: text});

        if (!text || !author) {
            return;
        }
        onSave(newCommentObj);
        this._authorInput.value = "";
        this._textInput.value = "";
    }
    render() {
        const { commentObj } = this.props;

        return (
            <form className="commentForm form-inline" onSubmit={this._handleSave}>
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Your name"
                        defaultValue={commentObj.author}
                        ref={(c) => this._authorInput = c} />
                </div>
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Say something..."
                        defaultValue={commentObj.text}
                        ref={(c) => this._textInput = c} />
                </div>
                <button className="btn btn-default" type="submit">Save</button>
            </form>
        );
    }
}

export class Comment extends Component {
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
            element = (
                <div>
                    <CommentForm
                        author={commentObj.author}
                        text={commentObj.text}
                        commentObj={commentObj}
                        onSave={this._handleSave} />
                    <button
                        className="btn btn-default"
                        onClick={this._handleCancel}
                    >Cancel</button>
                </div>
            );
        } else {
            element = (
                <div>
                    <span dangerouslySetInnerHTML={this._rawMarkup()} />
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
            );
        }

        return (
            <div className="comment well">
                <h5 className="commentAuthor">
                    {commentObj.author}&nbsp;
                    <small>
                        created {commentObj.createdAt}
                        &nbsp;|&nbsp;
                        updated {commentObj.updatedAt}
                    </small>
                </h5>
                {element}
            </div>
        );
    }
}

export class CommentList extends Component {
    render() {
        const { data, onDelete, onSave } = this.props;
        const commentNodes = data.map(function(comment) {
            return (
                <Comment
                    key={comment.objectId}
                    commentObj={comment}
                    onDelete={onDelete}
                    onSave={onSave} />
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
}

export class AddCommentBox extends Component {
    render() {
        return (
            <div>
                <h4>Add a comment</h4>
                <div className="well">
                    <CommentForm {...this.props} />
                </div>
            </div>
        );
    }
}
