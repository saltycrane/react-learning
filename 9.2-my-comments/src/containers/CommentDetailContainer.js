import React, { Component } from "react";
import { connect } from "react-redux";

import { deleteComment } from "../actions";
import { Comment } from "../components";


class CommentDetailContainer extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }
    handleDelete(commentId) {
        const { dispatch } = this.props;
        dispatch(deleteComment(commentId));
    }
    render() {
        const {
            params: { id },
            comments
        } = this.props;
        const comment = comments.find( item => item.objectId === id );

        return (
            <div className="commentBox">
                <h3>Comment {id}</h3>
                <Comment
                    commentObj={comment}
                    onDelete={this.handleDelete}
                    isDetailView={true}
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

export default connect(mapStateToProps)(CommentDetailContainer);
