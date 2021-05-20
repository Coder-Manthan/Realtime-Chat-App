const express = require("express"); // import express module
const app = express(); // Init the express in app variable
app.use(express.static("public"));
const http = require("http"); // import http module
const server = http.createServer(app); // Make a server using http and pass the app variable
const { Server } = require("socket.io"); // import socket.io
const io = new Server(server); // I initialize a new instance of socket.io by passing the server (the HTTP server) object.

// We make a route handler /(which means root or this directory) which we will serve the file to our server
app.get("/", (req, res) => {
  res.sendFile("./index.html");
});

// I listen on the connection event for incoming sockets and log it to the console. Each socket fires a special disconnect event
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// we’ll send the message to everyone, including the sender.
io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

// Make a http server to listen on port 3000
server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// Lets test the server by running `npm start`
// Now you can open `http://localhost:3000/` to view our page
