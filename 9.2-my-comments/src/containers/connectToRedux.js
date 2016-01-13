import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
    fetchComments,
    deleteComment,
    saveComment,
    editComment,
    cancelEditComment,
    saveImage,
    deleteSavedImage,
    deleteUnsavedImage,
    getLocation,
    setLocationFromUserInput,
    setLocationFromDetected,
    undoSetLocation
} from "../actions";


function mapStateToProps(state) {
    return {
        isFetching: state.comments.isFetching,
        lastUpdated: state.comments.lastUpdated,
        comments: state.comments.items,
        images: state.images.items,
        location: state.location
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
            deleteSavedImage,
            deleteUnsavedImage,
            getLocation,
            setLocationFromUserInput,
            setLocationFromDetected,
            undoSetLocation
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps);
