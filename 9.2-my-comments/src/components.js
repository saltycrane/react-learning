/* global $ */
import marked from "marked";
import React, { Component } from "react";


class Comment extends Component {
    rawMarkup() {
        var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
        return { __html: rawMarkup };
    }

    render() {
        return (
            <div className="comment">
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
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Your name" ref="author" />
                <input type="text" placeholder="Say something..." ref="text" />
                <input type="submit" value="Post" />
            </form>
        );
    }
}
