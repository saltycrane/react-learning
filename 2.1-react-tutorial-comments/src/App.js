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


class CommentList extends Component {
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


class CommentForm extends Component {
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


export default class CommentBox extends Component {
    constructor(props) {
        super(props);
        this.state = {data: []};
        this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    }
    loadCommentsFromServer() {
        $.ajax({
            url: this.props.url,
            dataType: "json",
            cache: false
        }).done((data) => {
            this.setState({data: data});
        }).fail((xhr, status, err) => {
            console.error(this.props.url, status, err.toString());
        });
    }
    handleCommentSubmit(comment) {
        const comments = this.state.data;
        const newComments = [...comments, comment];
        this.setState({data: newComments});

        $.ajax({
            url: this.props.url,
            dataType: "json",
            type: "POST",
            data: comment,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }
    componentDidMount() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    }
    render() {
        return (
            <div className="commentBox">
                <h4>Comments</h4>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
}
