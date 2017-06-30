const socket = io();
const Players = $("#playerList");
const PlayerTemplate = $("#Player").clone();
$("#Player").fadeOut(0);
console.log(PlayerTemplate);

const keys = {
    "87":{name:"up",value:false},
    "83":{name:"down",value:false},
    "68":{name:"right",value:false},
    "65":{name:"left",value:false},
    "32":{name:"space",value:false}
}

document.addEventListener("keydown", event => {
    const key = keys[event.keyCode] || null;
    console.log(event.keyCode);
    if(key && !keys[event.keyCode].value) socket.emit("keyUpdate", key.name, true);
    if(key) keys[event.keyCode].value = true;
});

document.addEventListener("keyup", event => {
    const key = keys[event.keyCode] || null;
    if(key && keys[event.keyCode].value) socket.emit("keyUpdate", key.name, false);
    if(key) keys[event.keyCode].value = false;
});

socket.on("update", PlayerList => {
    Players.find(".player").attr("con",0);
    PlayerList.forEach(Player => {
        const cur = Players.find(`#${Player.name}`);
        if(cur.length) {
            // Movement
            cur.css("top",Player.pos.y);
            cur.css("left",Player.pos.x);
            cur.attr("con",1);

            // Combat
            if(Player.interact && Player.target){
              let target = PlayerList.filter((jsonPlayer) => {
                return jsonPlayer.name === Player.target;
              })[0];
            if (target) {
                let dist = Math.sqrt(Math.pow(Player.pos.x - target.pos.x,2)+Math.pow(Player.pos.y - target.pos.y,2));
                console.log(dist);
                if (dist <= 100) {
                    gameEvent = {
                      type : "takeDamage",
                      target : target,
                      data : 1
                    };
                    socket.emit("gameEvent", gameEvent);
                }
            } else {
                Player.interact = false;
            }
          }

          // stat changes
          //cur.css("opacity", Player.hp/Player.maxHP); // For debug etc

        } else {
            const nplr = PlayerTemplate.clone();
            nplr.attr("id", Player.name);
            nplr.css("top",Player.pos.y);
            nplr.css("left",Player.pos.x);
            nplr.attr("con",1);
            // Adds a listener to player to be used in player targeting
            nplr.click(event => {
                let name = $(event.currentTarget).attr("id");
                socket.emit("onClick", name, event.which);
            });
            nplr.appendTo(Players);
        }
    });
    Players.find("[con=0]").remove();
});
