var Material = require('./material');

class metal extends Material {
    constructor(name, description, purity, durability, flexibility, density) {
        super(name, "metal", description, 1);
        this.purity = purity * this.quality;
        this.flexibility = flexibility * this.quality;
        this.durability = durability * this.quality;
        this.density = density * this.quality;
    }
}
module.exports = metal;
