import Parse from "parse";


Parse.initialize("rdOxoEPZqN4I8RvIkmcWmPK0xcaR7EfrIDj0WFYh", "EFEekvA7WVsPTN0SGiNYsHWvaiUiSdwWiJoZ6pMU");

export let Comment = Parse.Object.extend("Comment");
let Image = Parse.Object.extend("Image");

export function getComments(callback) {
    let query = new Parse.Query(Comment);
    query.include("images");
    query.find()
        .done(function(results) {
            const jsonResults = results.map(function(item) {
                return item.toJSON();
            });
            callback(jsonResults);
        })
        .fail(function(error) {
            console.error("Error: " + error.code + " " + error.meessage);
        });
}

export function saveComment(data, callback) {
    let comment = new Comment();
    // "unsaved images" are images that are not yet saved with a comment
    const unsavedImages = data.images.filter(function (item) {
        return !item.commentId;
    });

    comment.save(data)
        .done(function(object) {
            const commentId = object.id;

            // update the commentId field for any images that do not have
            // a commentId yet ("unsaved images")
            unsavedImages.forEach(function (image) {
                linkImageToComment(image, commentId);
            });

            if (callback) {
                callback(object.toJSON());
            }
        });
}

export function deleteComment(id) {
    let comment = new Comment();
    comment.id = id;
    comment.destroy();
    // TODO: error handling. on failure, put the comment back in the state.
}

// first save the File object, then store the file in the Image table
// file - a file object uploaded via a file <input>
export function saveImage(file, callback) {
    let parseFile = new Parse.File(file.name, file);
    parseFile.save()
        .done(function() {
            let image = new Image();
            image.save({
                file: parseFile
            }).done(function(object) {
                callback(object.toJSON());
            });
        });
}

export function linkImageToComment(imageData, commentId) {
    let image = new Image();
    imageData.commentId = commentId;
    image.save(imageData);
}

export function deleteImage(id) {
    let image = new Image();
    image.id = id;
    image.destroy();
}
