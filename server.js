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
    socket.on("keyUpdate", (key, press) => {
        if (press) Player.keyDown(key);
        else Player.keyUp(key);
    });
    socket.on("onClick", (id, button) => {
        if (button == 1) Player.onClick(id, false);
        else if (button == 3) Player.onClick(id, true);
    });
    socket.on("gameEvent", (gameEvent) => {
        switch (gameEvent.type) {
            case "takeDamage":
                let targetPlayer = PlayerList.filter(playerObject => {
                    return playerObject.name === gameEvent.target.name;
                })[0];
                targetPlayer.takeDamage(gameEvent.data);
                break;
            case "getHealed":

                break;
            case "loot":

                break;
            default:

        }
    });
    socket.on("disconnect", () => {
        PlayerList.splice(PlayerList.indexOf(Player), 1);
    });
});

// Game loop
setInterval(() => {
    PlayerList.forEach(Player => {
        Player.update();
    })
    io.emit("update", {
        PlayerList,
        version
    });
}, 1000 / 60); // how fast the game loop is

console.log("Server up");
