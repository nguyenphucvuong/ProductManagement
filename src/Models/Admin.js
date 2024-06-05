class Admin {
    
    constructor (idPr, namePr,typePr,pricePr,descriptionPr,colorPr,imagePr){
        this.idPr = idPr;
        this.namePr = namePr;
        this.typePr = typePr;
        this.pricePr = pricePr;
        this.descriptionPr = descriptionPr;
        this.colorPr =  Array.isArray(colorPr) ? colorPr : [colorPr];
        this.imagePr = Array.isArray(imagePr) ? imagePr : [imagePr];// kiểm tra xem image phải là một mảng k
    }
    setIdPr (idPr){
        this.idPr = idPr;
    }
    getIdPr(){
        return this.idPr;
    }
    setNamePr (namePr){
        this.namePr = namePr;
    }
    getNamePr(){
        return this.namePr;
    }
    setTypePr (typePr){
        this.typePr = typePr;
    }
    getTypePr(){
        return this.typePr;
    }
    setPricePr (pricePr){
        this.pricePr = pricePr;
    }
    getPricePr(){
        return this.pricePr;
    }
    setDescriptionPr (descriptionPr){
        this.descriptionPr = descriptionPr;
    }
    getColorPr(){
        return this.colorPr;
    }
    setColorPr (colorPr){
        this.colorPr = colorPr;
    }
    getDescriptionPr(){
        return this.descriptionPr;
    }
    setImagePr (imagePr){
        this.imagePr = imagePr;
    }
    getImagePr(){
        return this.imagePr;
    }
}
export default Admin;