import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchComments, deleteComment, saveComment } from "../actions";
import { Comment } from "../components";


class CommentDetailContainer extends Component {
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
        const {
            params: { id },
            comments
        } = this.props;
        const comment = comments.find( item => item.objectId === id );
        let element = null;

        if (comment) {
            // comment will initially be undefined if hitting the detail page directly
            // after receiving data from the API, it will re-render. isomorphism?
            element = (
                <Comment
                    commentObj={comment}
                    onDelete={this._handleDelete}
                    onSave={this._handleSave}
                    isDetailView={true}
                />
            );
        }

        return (
            <div className="commentBox">
                <h3>Comment {id}</h3>
                {element}
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
