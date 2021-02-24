class MapElement{

    /**
     * terrainFormats:
     *      0: cornucopia
     *      1: grass
     *      2: water
     *      3: sand
     *      4: forest
     *      5: ice/snow
     *      // 6 - 10 relate to rooms in a house
     *      6: house ~ general room
     *      7: house ~ kitchen/dining room
     *      8: house ~ bathrom
     *      9: house ~ bedroom
     *      10: house ~ game room
     *      // 11 - 12 relates to playground
     *      11: playground ~ jungle gym
     *      12: playground ~ swing 
     */
    constructor(format){
        this.terrainFormats = ["text-xs bg-gray-400","bg-green-500","bg-blue-700 text-white","bg-yellow-400","bg-green-800 text-white","bg-blue-200","bg-yellow-800 text-white","bg-gray-700 text-white"]
        this.locations = ["cornucopia", "grass", "water", "sand", "forest", "snow", "house", "kitchen", "bathroom", "bedroom", "game room", "playground", "swings"]
        this.formatChoice;
        if (format >= 6 && format <= 10){
            this.formatChoice = 6;
        }
        else if (format >= 11){
            this.formatChoice = 7;
        }
        else {
            this.formatChoice = format;
        }
        this.format = "w-16 h-16 box-border border-2 flex justify-center place-items-center " + this.terrainFormats[this.formatChoice];
        this.location = this.locations[format];
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

    getLocation(){
        return this.location;
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