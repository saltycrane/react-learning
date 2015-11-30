import React, { Component } from "react";

import connectToRedux from "./connectToRedux";
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

export default connectToRedux(CommentDetailContainer);
