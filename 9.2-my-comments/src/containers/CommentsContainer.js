import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
    fetchComments,
    deleteComment,
    saveComment,
    editComment,
    cancelEditComment,
    saveImage,
    deleteImage
} from "../actions";
import CommentList from "../components/CommentList";
import AddCommentBox from "../components/AddCommentBox";


class CommentsContainer extends Component {
    componentDidMount() {
        const { actions } = this.props;
        actions.fetchComments();
    }
    render() {
        const { comments, actions } = this.props;

        return (
            <div className="commentBox">
                <h3>Comments</h3>
                <CommentList
                    data={comments}
                    actions={actions}
                />
                <AddCommentBox
                    commentObj={{} /* when adding new comments, commentObj is empty */}
                    actions={actions}
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

function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        actions: bindActionCreators({
            fetchComments,
            deleteComment,
            saveComment,
            editComment,
            cancelEditComment,
            saveImage,
            deleteImage
        }, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentsContainer);
