class Discount { 
    constructor(id, nameDis,code, percentage,fromDateDis,toDateDis,descriptionDis,status){
        this.id = id;
        this.nameDis = nameDis;
        this.code = code;
        this.percentage = percentage;
        this.fromDateDis = fromDateDis;
        this.toDateDis = toDateDis;
        this.descriptionDis = descriptionDis;
        this.status = status;
    }
    setId(id){
        this.id = id;
    }
    getId(){
        return this.id;
    }
    setNameDis(nameDis){
        this.nameDis = nameDis;
    }
    getNameDis(){
        return this.nameDis;
    }
    setCode(code){
        this.code = code;
    }
    getCode(){
        return this.code;
    }
    setpercentage(percentage){
        this.percentage = percentage;
    }
    getpercentage(){
        return this.percentage;
    }
    setFromDateDis(fromDateDis){
        this.fromDateDis = fromDateDis;
    }
    getFromDateDis(){
        return this.fromDateDis;
    }
    SetToDateDis(toDateDis){
        this.toDateDis = toDateDis;
    }
    getToDateDis(){
        return this.toDateDis;
    }
    setDescriptionDis(descriptionDis){
        this.descriptionDis = descriptionDis;
    }
    getDescriptionDis(){
        return this.descriptionDis;
    }
    setStatus(status){
        this.status = status;
    }
    getStatus(){
        return this.status;
    }
    
}
export default Discount;