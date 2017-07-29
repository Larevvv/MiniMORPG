class weapon {
    constructor(name, description, type, damage, damageType, range, durability, ...misc){
        // TODO: weapon constructor
        this.name = name;
        this.description = description;
        this.type = type;
        this.damageType = type;
        this.range = range;
        this.misc = misc;
    }
}
module.exports = weapon;
