const express = require("express");

const http = require("http");

const socketIO = require("socket.io");

const app = express();

const server = http.createServer(app);

const io = socketIO(server);

app.use(express.static("public"));

const colors = [
  "#007bff",
  "#28a745",
  "#ffc107",
  "#dc3545",
  "#17a2b8",
  "#6610f2",
  "#fd7e14",
  "#6f42c1",
  "#e83e8c",
  "#20c997",
];

const users = {};

const usernames = [];
io.on("connection", (socket) => {
  socket.emit("request username");

  socket.on("set username", (username) => {
    const colorIndex = Object.keys(users).length % colors.length;

    const color = colors[colorIndex];

    users[socket.id] = { username, color };

    io.emit("user joined", { username, color });

    socket.emit("usernames", usernames);

    usernames.push(username);
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", {
      username: users[socket.id].username,
      message: msg,
      color: users[socket.id].color,
    });
  });
  socket.on("disconnect", () => {
    if (users[socket.id]) {
      io.emit("user left", users[socket.id].username + " left the chat");

      const index = usernames.indexOf(users[socket.id].username);

      if (index !== -1) {
        usernames.splice(index, 1);
      }

      delete users[socket.id];
    }
  });
});

const port = 3000;

server.listen(port, () => {
  console.log(`Server is running on ${port}.....`);
});
