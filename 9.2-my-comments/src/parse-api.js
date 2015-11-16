import Parse from "parse";


Parse.initialize("rdOxoEPZqN4I8RvIkmcWmPK0xcaR7EfrIDj0WFYh", "EFEekvA7WVsPTN0SGiNYsHWvaiUiSdwWiJoZ6pMU");

let Comment = Parse.Object.extend("Comment");

export function saveComment(data, callback) {
    let comment = new Comment();
    comment.save(data).then(function(object) {
        callback(object.toJSON());
    });
}

export function getComments(callback) {
    let query = new Parse.Query(Comment);
    query.find({
        success: function(results) {
            const jsonResults = results.map(function(item) {
                return item.toJSON();
            });
            callback(jsonResults);
        },
        error: function(error) {
            console.error("Error: " + error.code + " " + error.meessage);
        }
    });
}
