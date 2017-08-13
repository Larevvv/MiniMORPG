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
    },
    "66": {
        name: "backpack",
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

function processGameEvent(gameEvents) {
    // TODO: Process
    if(!gameEvents || gameEvents.length > 0){
        return;
    }
    for(let i=0; i<gameEvents.length; i++){
        console.log(gameEvents);
        switch (gameEvents[i].type) {
            case "inventory":
                // TODO: inventory
                let inventory = $('#inventory');
                console.log("doing it");
                inventory.attr("enabled", false);
                for(let i=0;i<gameEvents.data.length;i++) {
                    switch (gameEvents.data[i].type) {
                        case "weapon":
                            classString = "rpgui-icon sword";
                            break;
                        default:
                            classString = "rpgui-icon potion-red";
                    }
                    jQuery('<div/>', {
                        id: gameEvents.data[i].id,
                        class: classString
                    }).appendTo(inventory);

                }
                break;
            default:

        }
    }
}

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
                //console.log(Player.interact, Player.target)
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
                nplr.on("click", event => {
                    let id = $(event.currentTarget).attr("id");
                    socket.emit("onClick", id, event.which);
                });
                nplr.appendTo(Players);
            }
        });
        Players.find("[con=0]").remove();
        processGameEvent(data.gameEvents);
    }
});
