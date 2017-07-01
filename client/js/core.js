const socket = io();
const Players = $("#playerList");
const PlayerTemplate = $("#Player").clone();
$("#Player").fadeOut(0);

const keys = {
    "87": {
        name: "up",
        value: false
    },
    "83": {
        name: "down",
        value: false
    },
    "68": {
        name: "right",
        value: false
    },
    "65": {
        name: "left",
        value: false
    },
    "32": {
        name: "space",
        value: false
    }
}

document.addEventListener("keydown", event => {
    const key = keys[event.keyCode] || null;
    if (key && !keys[event.keyCode].value) socket.emit("keyUpdate", key.name, true);
    if (key) keys[event.keyCode].value = true;
});

document.addEventListener("keyup", event => {
    const key = keys[event.keyCode] || null;
    if (key && keys[event.keyCode].value) socket.emit("keyUpdate", key.name, false);
    if (key) keys[event.keyCode].value = false;
});

let version = null;
socket.on("update", data => {
    if (version !== null && data.version !== version) {
        socket.disconnect();
        location.reload();
    } else {
        Players.find(".player").attr("con", 0);
        data.PlayerList.forEach(Player => {
            const cur = Players.find(`#${Player.id}`);
            if (cur.length) {
                // Movement
                cur.css("top", Player.pos.y);
                cur.css("left", Player.pos.x);
                cur.attr("con", 1);
                // Combat
                if (Player.interact && Player.target) {
                    let target = data.PlayerList.filter((jsonPlayer) => {
                        return jsonPlayer.id === Player.target;
                    })[0];
                    if (target) {
                        let dist = Math.sqrt(Math.pow(Player.pos.x - target.pos.x, 2) + Math.pow(Player.pos.y - target.pos.y, 2));
                        if (dist <= 100) {
                            gameEvent = {
                                type: "takeDamage",
                                target: target,
                                data: 1
                            };
                            socket.emit("gameEvent", gameEvent);
                        }
                    } else {
                        Player.interact = false;
                    }
                }
                if(Player.id === socket.id) {
                    RPGUI.set_value($("#hp-bar")[0], Player.hp/Player.maxHP);
                }
                // stat changes
                //cur.css("opacity", Player.hp/Player.maxHP); // For debug etc
            } else {
                const nplr = PlayerTemplate.clone();
                nplr.attr("id", Player.id);
                nplr.css("top", Player.pos.y);
                nplr.css("left", Player.pos.x);
                nplr.attr("con", 1);
                // Adds a listener to player to be used in player targeting
                nplr.click(event => {
                    event.preventDefault();
                    let name = $(event.currentTarget).attr("id");
                    socket.emit("onClick", name, event.which);
                });
                nplr.appendTo(Players);
            }
        });
        Players.find("[con=0]").remove();
    }
});
