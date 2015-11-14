var fs = require("fs");
var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

var COMMENTS_FILE = path.join(__dirname, "comments.json");

app.set("port", 3001);

// app.use("/", express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/comments", function(req, res) {
    fs.readFile(COMMENTS_FILE, function(err, data) {
        res.setHeader("Cache-Control", "no-cache");
        // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        res.json(JSON.parse(data));
    });
});

app.post("/api/comments", function(req, res) {
    fs.readFile(COMMENTS_FILE, function(err, data) {
        var comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(err) {
            res.setHeader("Cache-Control", "no-cache");
            // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
            res.json(comments);
        });
    });
});

app.listen(app.get("port"), function() {
    console.log("API server started: http://localhost:" + app.get("port"));
});
