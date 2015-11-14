import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

import { fetchComments, submitComment } from "../actions";
import { CommentList, CommentForm } from "../components";


class AsyncApp extends Component {
    constructor(props) {
        super(props);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    }
    handleCommentSubmit(comment) {
        const { dispatch } = this.props;
        dispatch(submitComment(comment));
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchComments());
        // setInterval(this.loadCommentsFromServer, 2000);
    }
    render() {
        const { dispatch } = this.props;
        return (
            <div className="commentBox">
                <h4>Comments</h4>
                <CommentList data={this.props.comments} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
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

export default connect(mapStateToProps)(AsyncApp);
