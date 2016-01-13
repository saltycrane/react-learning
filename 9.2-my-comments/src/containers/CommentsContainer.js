import React, { Component } from "react";

import connectToRedux from "./connectToRedux";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";


class CommentsContainer extends Component {
    componentDidMount() {
        const { actions } = this.props;
        actions.fetchComments();
    }
    render() {
        const { comments, images, location, actions } = this.props;

        return (
            <div className="commentBox">
                <h3>Comments</h3>
                <CommentList
                    data={comments}
                    actions={actions}
                />
                <div>
                    <h4>Add a comment</h4>
                    <div className="well">
                        <CommentForm
                            commentObj={{} /* when adding new comments, commentObj is empty */}
                            images={images}
                            location={location}
                            actions={actions}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default connectToRedux(CommentsContainer);
