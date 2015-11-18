import Parse from "parse";


Parse.initialize("rdOxoEPZqN4I8RvIkmcWmPK0xcaR7EfrIDj0WFYh", "EFEekvA7WVsPTN0SGiNYsHWvaiUiSdwWiJoZ6pMU");

let Comment = Parse.Object.extend("Comment");

export function getComments(callback) {
    let query = new Parse.Query(Comment);
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
            callback(object.toJSON());
        });
}

export function deleteComment(id) {
    let comment = new Comment();
    comment.id = id;
    comment.destroy();
    // TODO: error handling. on failure, put the comment back in the state.
}
