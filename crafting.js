var Weapon = require('./js/equipment/weapon');

class weaponCrafting {
    constructor(){
        // TODO: Create a method to get crafting settings from server
    }

    craft(itemType, material1, material2){
        switch (itemType) {
            case "sword":
                let name = material1.name + " sword"
                let description = material1.name + " sword with hilt made of " + material2.name;
                let durability = material1.durability;
                let purity = material1.purity;
                let hardness = material2.hardness;
                let difficulty = Math.floor((material1.difficulty + material2.difficulty)/2);
                // TODO: Proper weapon parameter calculations
                let damage = (purity * hardness)/difficulty;
                return new Weapon(name, description, itemType, damage, "sharp", 75, durability);
                break;
            case "bow":
                let name = material1.name + " bow"
                let description = material1.name + " bow made with " + material2.name;
                let durability = material1.durability;
                let purity = material1.purity;
                let hardness = material2.hardness;
                let difficulty = Math.floor((material1.difficulty + material2.difficulty)/2);
            // TODO: Proper weapon parameter calculations
                let damage = (purity * hardness)/difficulty;
                return new Weapon(name, description, itemType, damage, "sharp", 75, durability);
                break;
            default:
                return new Weapon("Mystery", "mystery", "mystery", 0, "mystery", 0, 0);
        }
    }

}
module.exports = weaponCrafting;
