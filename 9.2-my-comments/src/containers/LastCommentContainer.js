import React, { Component } from "react";

import connectToRedux from "./connectToRedux";
import Comment from "../components/Comment";
import CommentForm from "../components/CommentForm";


class LastCommentContainer extends Component {
    componentDidMount() {
        const { actions } = this.props;
        actions.fetchComments();
    }
    render() {
        const {
            actions,
            comments,
            images
        } = this.props;
        const comment = comments[comments.length - 1];
        let element = null;

        if (comment) {
            // comment will initially be undefined if hitting the detail page directly
            // after receiving data from the API, it will re-render. isomorphism?
            element = (
                <div>
                    <h3>Comment {comment.objectId}</h3>
                    <Comment
                        commentObj={comment}
                        images={images}
                        actions={actions /* Send all the bound action creators to child components. Does this defeat the purpose of smart/dumb components? */}
                        isDetailView={false}
                    />
                    <h4>Add a comment</h4>
                    <div className="well">
                        <CommentForm
                            commentObj={{} /* when adding new comments, commentObj is empty */}
                            actions={actions}
                        />
                    </div>
                </div>
            );
        }

        return (
            <div className="commentBox">
                {element}
            </div>
        );
    }
}

export default connectToRedux(LastCommentContainer);
