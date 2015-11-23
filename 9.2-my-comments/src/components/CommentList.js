import React, { Component } from "react";

import Comment from "./Comment";


export default class CommentList extends Component {
    render() {
        const { data, actions } = this.props;
        const commentNodes = data.map(function(comment) {
            return (
                <Comment
                    key={comment.objectId}
                    commentObj={comment}
                    actions={actions}
                />
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
}
