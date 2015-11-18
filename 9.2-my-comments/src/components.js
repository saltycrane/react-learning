import marked from "marked";
import React, { Component } from "react";
import { Link } from "react-router";


export class Comment extends Component {
    rawMarkup() {
        const { commentObj } = this.props;
        var rawMarkup = marked(commentObj.text.toString(), {sanitize: true});
        return { __html: rawMarkup };
    }
    render() {
        const { commentObj, onDelete, isDetailView = false } = this.props;
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
                <h5 className="commentAuthor">
                    {commentObj.author}&nbsp;
                    <small>posted {commentObj.createdAt}</small>
                </h5>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
                <button
                    className="btn btn-default"
                    onClick={onDelete.bind(null, commentObj.objectId)}
                >Delete</button>
                {viewButton}
            </div>
        );
    }
}


export class CommentList extends Component {
    render() {
        const { data, onDelete } = this.props;
        const commentNodes = data.map(function(comment) {
            return (
                <Comment commentObj={comment} onDelete={onDelete} />
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
}


export class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        const author = this.refs.author.value.trim();
        const text = this.refs.text.value.trim();
        if (!text || !author) {
            return;
        }
        this.props.onCommentSubmit({author: author, text:text});
        this.refs.author.value = "";
        this.refs.text.value = "";
    }
    render() {
        return (
            <div>
                <h4>Add a comment</h4>
                <div className="well">
                    <form className="commentForm form-inline" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input className="form-control" type="text" placeholder="Your name" ref="author" />
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="text" placeholder="Say something..." ref="text" />
                        </div>
                        <button className="btn btn-default" type="submit">Post</button>
                    </form>
                </div>
            </div>
        );
    }
}
