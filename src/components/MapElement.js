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

    setMessage(message){
        this.message = message;
    }
}
export default MapElement;