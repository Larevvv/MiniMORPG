var metal = require('./js/materials/metal');
var wood =  require('./js/materials/wood');
var crafting = require('./crafting');

var CraftingStation = new crafting();
var craftedMetal = new metal("meme", "ASD", 10, 10, 10, 10);
var craftedWood = new wood("dank", "Something wood", 10, 10);
something = CraftingStation.craft("sword", craftedMetal, craftedWood);
console.log(something.name);
console.log(something.description);;
