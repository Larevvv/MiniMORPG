class Material {
    constructor(name, type, description, difficulty){
        this.name = name;
        this.type = type;
        this.description = description;
        this.difficulty = difficulty;
        this.quality = Math.ceil(Math.random()*100);
    }
    getParameters(id){
        // TODO:
    }
}

module.exports = Material;
