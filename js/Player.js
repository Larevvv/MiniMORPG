
class Player {
    constructor(name) {
        // Player identifying
        this.id = "0000-0000-0000-0000";
        this.name = name;
        //this.instanceId = 0;

        // combat
        this.maxHP = 100;
        this.hp = 100;
        this.maxMana = 100;
        this.mana = 100;
        this.interact = false;
        this.target = "";

        // Player stuff. Inventory etc.
        this.Inventory = {};
        this.equips = {
            weapon1 : null,
            weapon2 : null,
            armor : null
        };

        // Controls and position
        this.pos = {x:0,y:0};
        this.speed = 5;
        this.keys = {
            up: false,
            down: false,
            left: false,
            right: false,
            space: false
        }
    }

    takeDamage (amount) {
        this.hp -= amount;
    }

    onClick(target, interact) {
        this.target = target;
        this.interact = interact;
    }

    keyDown(key) {
        this.keys[key] = true;
        if (this.keys.space){
            this.interact = !this.interact;
        }
    }

    keyUp(key) {
        this.keys[key] = false;
    }

    update() {
        // movement
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
