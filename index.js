const express = require("express");
const app = express();
const port = 3000;

const http = require("http").Server(app);

const io = require("socket.io")(http);

// set the view engine to ejs
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

// use res.render to load up an ejs view file

// index page
app.get("/", function (req, res) {
  res.render("pages/index");
});

// about page
app.get("/about", function (req, res) {
  res.render("pages/about");
});

io.on("connection", (socket) => {
  console.log("connected: " + socket);
  socket.on("position", (userid, position) => {
    console.log("message: " + userid + " Position: " + position);
  });
});

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
