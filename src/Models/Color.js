class Color {
    constructor (nameColor,color){
        this.nameColor = nameColor;
        this.color = color;
    }
    setNameColor (nameColor){
        this.nameColor = nameColor;
    }
    getNameColor(){
        return this.nameColor;
    }
    setColor (color){
        this.color = color;
    }
    getColor(){
        return this.color;
    }
}
export default Color;