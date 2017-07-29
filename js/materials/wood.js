var Material = require('./material');

class wood extends Material {
    constructor(name, description, hardness, dryness) {
        // TODO: Get settings by id
        super(name, "wood", description, 1);
        this.hardness = hardness * this.quality;
        this.dryness = dryness * this.quality;
    }
}

module.exports = wood;
