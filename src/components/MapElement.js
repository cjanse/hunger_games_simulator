class MapElement{

    constructor(format){
        this.format = format;
        this.tributeNames = [];
    }

    getFormat(){
        return this.format;
    }

    getMessage(){
        var i;
        var message = "";
        for (i = 0; i < this.tributeNames.length; i++){
            message += this.tributeNames[i] + "\n";
        }
        return message;
    }

    addTributeName(tributeName){
        this.tributeNames.push(tributeName);
    }

    removeTributeName(tributeName){
        //console.log("removeTributeName");
        //console.log(this.tributeNames);
        var temptributeNames = [];
        var i = 0;
        while (i < this.tributeNames.length){
            temptributeNames.push(this.tributeNames.pop());
            if (temptributeNames[i] == tributeName){
                //console.log("Found tribute name");
                temptributeNames.pop();
            }
            else {
                i++;
            }
        }
        this.tributeNames = temptributeNames;
        //console.log(this.tributeNames);
    }


    setMessage(message){
        this.message = message;
    }
}
export default MapElement;