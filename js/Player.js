var entity = require('./worldItems/entity.js');

class Player extends entity{
    constructor(id) {
        super(id, "name", {
            x:0,
            y:0
        });
        // Player identifying
        //this.id = id;
        //this.name = "name";
        //this.instanceId = 0;
        this.activateEvent = false;
        this.gameEvent = [];

        // combat
        this.maxHP = 100;
        this.hp = 100;
        this.maxMana = 100;
        this.mana = 100;
        this.interact = false;
        this.target = "";

        // Player stuff. Inventory etc.
        this.inventory = [
            {
                id: "asdiasdo",
                type: "weapon"
            }, {
                id: "asdia",
                type: "something"
            }
        ];
        this.equips = {
            weapon1: null,
            weapon2: null,
            armor: null
        };

        // Controls and position
        //this.pos = {
        //    x: 0,
        //    y: 0
        //};

        this.speed = 5;
        this.keys = {
            up: false,
            down: false,
            left: false,
            right: false,
            backpack: false,
            space: false
        }
    }

    takeDamage(amount) {
        this.hp -= amount;
    }

    onClick(target, interact) {
        this.target = target;
        this.interact = interact;
    }

    keyDown(key) {
        this.keys[key] = true;
        if (this.keys.space) {
            this.interact = !this.interact;
        } else if (this.keys.backpack) {
            this.gameEvent.push({
                "type": "inventory",
                "target": this.id,
                "data": this.inventory
            });
        }
    }

    keyUp(key) {
        this.keys[key] = false;
    }

    update() {
        // movement
        let x = 0,
            y = 0;
        if (this.keys.up) y -= 1;
        if (this.keys.down) y += 1;
        if (this.keys.right) x += 1;
        if (this.keys.left) x -= 1;
        const dist = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        this.pos.x += (x / dist || 0) * this.speed;
        this.pos.y += (y / dist || 0) * this.speed;
        if (this.gameEvent) {

        }
        let returnEvent = this.gameEvent;
        this.gameEvent = [];
        return returnEvent;
    }
}

module.exports = Player;
