
class Player {
    constructor(name) {
        this.name = name;
        this.pos = {x:0,y:0};
        this.speed = 5;
        this.keys = {
            up: false,
            down: false,
            left: false,
            right: false
        }
    }

    keyDown(key) {
        this.keys[key] = true;
    }

    keyUp(key) {
        this.keys[key] = false;
    }

    update() {
        let x=0,y=0;
        if(this.keys.up) y-=1;
        if(this.keys.down) y+=1;
        if(this.keys.right) x+=1;
        if(this.keys.left) x-=1;
        const dist = Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
        this.pos.x += (x/dist||0)*this.speed;
        this.pos.y += (y/dist||0)*this.speed;
    }
}

module.exports = Player;
