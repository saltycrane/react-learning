import React, { Component } from "react";

import connectToRedux from "./connectToRedux";
import CommentForm from "../components/CommentForm";
import * as util from "../util";


class EditCommentContainer extends Component {
    componentDidMount() {
        const { actions } = this.props;
        actions.fetchComments();
    }
    render() {
        const {
            params: { id },
            actions,
            comments,
            images,
            location
        } = this.props;
        const commentObj = comments.find( item => item.objectId === id );
        let element = null;

        if (commentObj) {
            element = (
                <div className="well">
                    <div className="comment-metadata margin-md-bottom">
                        created {util.formatDate(commentObj.createdAt)}
                        &nbsp;|&nbsp;
                        updated {util.formatDate(commentObj.updatedAt)}
                    </div>
                    <div className="margin-md-bottom">
                        <CommentForm
                            commentObj={commentObj}
                            images={images}
                            location={location}
                            actions={actions}
                            isEditView={true}
                        />
                    </div>
                </div>
            );
        }

        return (
            <div className="commentBox">
                <h3>Editing Comment {id}</h3>
                {element}
            </div>
        );
    }
}

export default connectToRedux(EditCommentContainer);
