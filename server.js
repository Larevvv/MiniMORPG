// Load dependencies and setup server on port 80
const express = require("express");
const app = express();
const server = app.listen(80);
const io = require("socket.io").listen(server);
app.use(express.static("client"));

const version = +new Date();

const PlayerClass = require("./js/Player.js");

const PlayerList = [];

// When socket connects to server
io.on("connection", socket => {
    console.log("Connected");
    const Player = new PlayerClass(socket.id);
    PlayerList.push(Player);
    socket.on("onClick", (target, pos, button) => Player.onClick(target, pos, button));
    socket.on("disconnect", () => {
        PlayerList.splice(PlayerList.indexOf(Player), 1);
    });
});

// Game loop
let step = 0;
setInterval(() => {
    step++;
    PlayerList.forEach(Player => {
        Player.update();
    })
    io.emit("update", {
        PlayerList,
        version,
        step
    });
}, 1000 / 60); // how fast the game loop is
