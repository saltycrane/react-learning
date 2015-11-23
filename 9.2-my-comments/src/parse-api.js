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
    comment.save(data)
        .done(function(object) {
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
export function saveImage(file, commentId, callback) {
    let parseFile = new Parse.File(file.name, file);
    parseFile.save()
        .done(function() {
            let image = new Image();
            image.save({
                file: parseFile,
                commentId: commentId
            }).done(function(object) {
                callback(object.toJSON());
            });
        });
}

export function deleteImage(id) {
    let image = new Image();
    image.id = id;
    image.destroy();
}
