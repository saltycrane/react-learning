import marked from "marked";
import React, { Component } from "react";


class Comment extends Component {
    rawMarkup() {
        var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
        return { __html: rawMarkup };
    }

    render() {
        return (
            <div className="comment well">
                <h5 className="commentAuthor">
                    {this.props.author}
                </h5>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
            </div>
        );
    }
}


export class CommentList extends Component {
    render() {
        var commentNodes = this.props.data.map(function(comment) {
            return (
                <Comment author={comment.author}>
                    {comment.text}
                </Comment>
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
    constructor() {
        super();
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
