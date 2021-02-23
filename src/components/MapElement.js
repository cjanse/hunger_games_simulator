class MapElement{

    constructor(format){
        this.terrainFormats = ["w-16 h-16 box-border border-2 flex justify-center place-items-center text-xs bg-gray-500","w-16 h-16 box-border border-2 flex justify-center place-items-center bg-green-500"]
        this.format = this.terrainFormats[format];
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

    findAnotherTributeName(name){
        if (this.tributeNames.length <= 1){
            return "";
        }
        else {
            var tempTributeNames = [];
            var i;
            for (i = 0; i < this.tributeNames.length; i++){
                if (this.tributeNames[i] != name){
                    console.log(name + ":" +this.tributeNames[i])
                    tempTributeNames.push(this.tributeNames[i]);
                }
            }
            var nameIndex = Math.floor(Math.random()*tempTributeNames.length);
            return tempTributeNames[nameIndex];
        }
    }

    setMessage(message){
        this.message = message;
    }
}
export default MapElement;