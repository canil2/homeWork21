let express = require("express");
let mongojs = require("mongojs");
var path = require("path");
var ObjectId = require("mongodb").ObjectID;
var bodyParser = require("body-parser");

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let googlebooksdb = mongojs(
  "mongodb://googlebooks:password1@ds345597.mlab.com:45597/heroku_bjzjj58v",
  ["googlebooks"]
);

//API
app.get("/api/books", function (req, res) {
  googlebooksdb.googlebooks.find(function (err, data) {
    if (err) return err;
    else res.json(data);
  });
});

app.put("/api/addbooks", function (req, res) {
  var dataToInsert = req.body;

  googlebooksdb.googlebooks.insert(dataToInsert, function (error, datar) {
    if (error) return error;
    else {
      return res.json(datar);
    }
  });
});

app.delete("/api/books/:id", function (req, res) {
  var body = "";
  req.on("data", function (data) {
    body += data;
  });
  req.on("end", function () {
    googlebooksdb.googlebooks.remove(
      { _id: ObjectId(req.params.id) },
      function (err, data) {
        if (err) return err;
        else {
          console.log("removed book from saved list");
          return res.json({ msg: "removed book from saved list" });
        }
      }
    );
  });
});

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(process.env.PORT || 5000, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
