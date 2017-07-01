class Player {
    constructor(id) {
        // Player identifying
        this.id = id;
        this.name = id;
        //this.instanceId = 0;

        // Combat
        this.maxHP = 100;
        this.hp = 100;
        this.maxMana = 100;
        this.mana = 100;
        this.interact = false;
        this.target = "";

        // Player stuff. Inventory etc.
        this.Inventory = [];
        this.equips = {
            weapon1: null,
            weapon2: null,
            armor: null
        };

        // Controls and position
        this.pos = {
            x: 0,
            y: 0
        };
        this.tpos = {
            x: 0,
            y: 0
        };
        this.speed = 5;
    }

    takeDamage(amount) {
        this.hp -= amount;
    }

    onClick(target, pos, button) {
        if(target && button === 3) this.target = target;
        else if(!target && button === 3) this.target = null;
        else if(button === 1) this.tpos = {x:pos.x||this.pos.x,y:pos.y||this.pos.y};
    }

    update() {
        // Movement
        const dist = Math.sqrt(Math.pow(this.tpos.x-this.pos.x, 2) + Math.pow(this.tpos.y-this.pos.y, 2));
        this.pos.x += Math.round(((this.tpos.x-this.pos.x) / dist || 0) * this.speed);
        this.pos.y += Math.round(((this.tpos.y-this.pos.y) / dist || 0) * this.speed);
        if(dist < 5) {
            this.tpos.x = this.pos.x;
            this.tpos.y = this.pos.y;
        }
    }
}

module.exports = Player;
