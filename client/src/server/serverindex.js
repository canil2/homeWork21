let express = require("express");
let mongojs = require("mongojs");
var test_path = require("path");
var ObjectId = require("mongodb").ObjectID;
var bodyParser = require("body-parser");

let app = express();
/*app.use(express.static(path.join(__dirname, "build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "/public/index.html"));
});*/

let googlebooksdb = mongojs("googlebooks", ["googlebooks"]);

//API
app.get("/api/books", function (req, res) {
  googlebooksdb.googlebooks.find(function (err, data) {
    if (err) return err;
    else res.json(data);
  });
});

app.post("/api/books", function (req, res) {
  var body = "";
  req.on("data", function (data) {
    body += data;
  });
  req.on("end", function () {
    var dataToInsert;
    if (body == {} || body == "" || body == undefined || body == null) {
      dataToInsert = {};
    } else {
      dataToInsert = JSON.parse(body);
    }
    googlebooksdb.googlebooks.insert(dataToInsert, function (error, datar) {
      if (error) return error;
      else {
        return res.json(datar);
      }
    });
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

app.listen(5000);
