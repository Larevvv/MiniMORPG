const socket = io();
const Players = $("#playerList");
const PlayerTemplate = $("#Player").clone();
$("#Player").fadeOut(0);

$(document).on("click", event => {
    event.preventDefault();
    socket.emit("onClick", null, {x:event.clientX-$(window).width()/2,y:event.clientY-$(window).height()/2}, event.which)
})
$(document).on("contextmenu", event => {
    event.preventDefault();
    socket.emit("onClick", event.target.id || null, {x:event.clientX-$(window).width()/2,y:event.clientY-$(window).height()/2}, event.which)
})

let version = null;
let cache = {};

socket.on("update", data => {
    cache = data;
});

const render = () => {
    if (version !== null && cache.version !== version) {
        socket.disconnect();
        location.reload();
    } else if(cache.PlayerList){
        Players.find(".player").attr("con", 0);
        Players.find(".player").removeClass("target");
        cache.PlayerList.forEach(Player => {
            const cur = Players.find(`#${Player.id}`);
            if (cur.length) {
                // Movement
                cur.css("top", Player.pos.y);
                cur.css("left", Player.pos.x);
                cur.attr("con", 1);
                // HP;
                cur.find(".hp").find(".rpgui-progress-fill").css("width",`${Player.hp/Player.maxHP*100}%`)
            } else {
                const nplr = PlayerTemplate.clone();
                nplr.attr("id", Player.id);
                nplr.css("top", Player.pos.y);
                nplr.css("left", Player.pos.x);
                nplr.attr("con", 1);
                nplr.find(".info").text(Player.name)
                // Adds a listener to player to be used in player targeting
                nplr.appendTo(Players);
            }
        });
        Players.find("[con=0]").remove();
        localPlayer = cache.PlayerList.filter(v => v.id === socket.id)[0];
        Players.find(`#${localPlayer.id}`).removeClass("local");
        Players.find(`#${localPlayer.id}`).addClass("local");
        if(localPlayer.target) Players.find(`#${localPlayer.target}`).addClass("target");
        RPGUI.set_value($("#hp-bar")[0], localPlayer.hp / localPlayer.maxHP);
    }
    window.requestAnimationFrame(render);
}
window.requestAnimationFrame(render);
