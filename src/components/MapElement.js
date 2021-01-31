class MapElement{
    constructor(format, message){
        this.format = format;
        this.message = message;
    }

    getFormat(){
        return this.format;
    }

    getMessage(){
        return this.message;
    }
}
export default MapElement;