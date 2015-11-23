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
import Comment from "../components/Comment";


class CommentDetailContainer extends Component {
    componentDidMount() {
        const { actions } = this.props;
        actions.fetchComments();
    }
    render() {
        const {
            params: { id },
            actions,
            comments,
            images
        } = this.props;
        const comment = comments.find( item => item.objectId === id );
        let element = null;

        if (comment) {
            // comment will initially be undefined if hitting the detail page directly
            // after receiving data from the API, it will re-render. isomorphism?
            element = (
                <Comment
                    commentObj={comment}
                    images={images}
                    actions={actions /* Send all the bound action creators to child components. Does this defeat the purpose of smart/dumb components? */}
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
        comments: state.comments.items,
        images: state.images.items
    };
}

function mapDispatchToProps(dispatch) {
    return {
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
)(CommentDetailContainer);
