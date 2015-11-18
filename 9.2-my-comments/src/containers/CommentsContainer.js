import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

import { fetchComments, submitComment, deleteComment } from "../actions";
import { CommentList, CommentForm } from "../components";


class CommentsContainer extends Component {
    constructor(props) {
        super(props);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchComments());
        // setInterval(this.loadCommentsFromServer, 2000);
    }
    handleCommentSubmit(comment) {
        const { dispatch } = this.props;
        dispatch(submitComment(comment));
    }
    handleDelete(commentId) {
        const { dispatch } = this.props;
        dispatch(deleteComment(commentId));
    }
    render() {
        return (
            <div className="commentBox">
                <h3>Comments</h3>
                <CommentList
                    data={this.props.comments}
                    onDelete={this.handleDelete}
                />
                <CommentForm
                    onCommentSubmit={this.handleCommentSubmit}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isFetching: state.comments.isFetching,
        lastUpdated: state.comments.lastUpdated,
        comments: state.comments.items
    };
}

export default connect(mapStateToProps)(CommentsContainer);
