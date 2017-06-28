const socket = io();
const Players = $("#playerList");
const PlayerTemplate = $("#Player").clone();
$("#Player").fadeOut(0);
console.log(PlayerTemplate);

const keys = {
    "87":{name:"up",value:false},
    "83":{name:"down",value:false},
    "68":{name:"right",value:false},
    "65":{name:"left",value:false}
}

document.addEventListener("keydown", event => {
    const key = keys[event.keyCode] || null;
    if(key && !keys[event.keyCode].value) socket.emit("keyUpdate", key.name, true);
    if(key) keys[event.keyCode].value = true;
})

document.addEventListener("keyup", event => {
    const key = keys[event.keyCode] || null;
    if(key && keys[event.keyCode].value) socket.emit("keyUpdate", key.name, false);
    if(key) keys[event.keyCode].value = false;
})

socket.on("update", PlayerList => {
    Players.find(".player").attr("con",0);
    PlayerList.forEach(Player => {
        const cur = Players.find(`#${Player.name}`);
        if(cur.length) {
            cur.css("top",Player.pos.y);
            cur.css("left",Player.pos.x);
            cur.attr("con",1)
        } else {
            const nplr = PlayerTemplate.clone();
            nplr.attr("id", Player.name);
            nplr.css("top",Player.pos.y);
            nplr.css("left",Player.pos.x);
            nplr.attr("con",1)
            nplr.appendTo(Players);
        }
    });
    Players.find("[con=0]").remove();
})
