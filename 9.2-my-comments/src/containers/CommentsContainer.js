import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchComments, saveComment, deleteComment } from "../actions";
import CommentList from "../components/CommentList";
import AddCommentBox from "../components/AddCommentBox";


class CommentsContainer extends Component {
    constructor(props) {
        super(props);
        this._handleSave = this._handleSave.bind(this);
        this._handleDelete = this._handleDelete.bind(this);
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchComments());
    }
    _handleSave(comment) {
        const { dispatch } = this.props;
        dispatch(saveComment(comment));
    }
    _handleDelete(commentId) {
        const { dispatch } = this.props;
        dispatch(deleteComment(commentId));
    }
    render() {
        return (
            <div className="commentBox">
                <h3>Comments</h3>
                <CommentList
                    data={this.props.comments}
                    onDelete={this._handleDelete}
                    onSave={this._handleSave}
                />
                <AddCommentBox
                    commentObj={{} /* when adding new comments, commentObj is empty */}
                    onSave={this._handleSave}
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
