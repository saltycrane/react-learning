import React, { Component } from "react";

import CommentForm from "./CommentForm";

export default class AddCommentBox extends Component {
    render() {
        return (
            <div>
                <h4>Add a comment</h4>
                <div className="well">
                    <CommentForm {...this.props} />
                </div>
            </div>
        );
    }
}
