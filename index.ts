//Express
const express = require("express");
const app = express();

// Redis
const Redis = require("ioredis");
const redis = new Redis();

//Redis JSON
// import Redis from 'ioredis';
// const r = new Redis();
const jsonlol = { awa: "eve", unarray: [4, 1, 20] };
// r.set("jsonlol", JSON.stringify(jsonlol))

//console.log('JSON.SET', 'object', ". '", JSON.stringify(jsonlol), "'")

//HTTP
const port = 3000;
const http = require("http").Server(app);

//Socket.io
const io = require("socket.io")(http);

//Set the view engine to ejs
app.set("view engine", "ejs");

//Set express static path
app.use(express.static(__dirname + "/public"));

// Index page
app.get("/", function (req, res) {
  res.render("pages/index");
});

// About page
app.get("/about", async function (req, res) {
  console.log("JSON.SET", "example", ".", `'${JSON.stringify(jsonlol)}'`);

  redis
    .pipeline([
      ["JSON.SET", "example", ".", `'${JSON.stringify(jsonlol)}'`],
      ["JSON.GET", "example"],
    ])
    .exec();

  res.render("pages/about");
});

//Socket connection
io.on("connection", (socket) => {
  console.log("connected: " + socket);
  socket.on("position", (userid, position) => {
    console.log("message: " + userid + " Position: " + position);
  });
});

//HTTP listen
http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
