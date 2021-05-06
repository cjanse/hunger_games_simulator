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
        this.snackFoodOptions = [[0,"crackers",0.2],[0,"beef jerky",0.3],[0,"fruit snack",0.2], [0,"Mochi",0.2],[0,"Protein bars",0.4]];
        this.survivalFoodOptions = [[1,"berries",0.15],[1,"egg",0.2],[1,"rabbit",0.5],[1,"mouse",0.3],[1,"turkey",0.5],[1,"deer",0.8]];
        this.seaOptions = [[2,"fish", 0.4], [2,"shark",0.5], [2,"calamari",0.4]];
        this.specialOptions = [[3,"corn chowder stew",0.6], [3,"tiramisu",0.2], [3,"ham and cheese sandwich",0.4], [3,"a five course meal",1.0]];
        this.foods = [];
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
        this.createItems(format);
        this.location = this.locations[format];
        this.refillWaterStation = false;
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

    setRefillWaterStation(value){
        this.refillWaterStation = value;
    }

    getRefillWaterStation(){
        return this.refillWaterStation;
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

    findAnotherTributeNameAtSpot(name){
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

    findTributeName(name){
        if (this.tributeNames.length < 1){
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

    createItems(format){
        if (format == 0){
            var foodNumber = Math.random() * 10;
            var i;
            for (i = 0; i < foodNumber; i++){
                var probability = Math.random();
                if (probability < 0.6){
                    this.foods.push(this.snackFoodOptions[Math.floor(Math.random() * this.snackFoodOptions.length)]);
                }
                else if (probability < 0.8){
                    this.foods.push(this.survivalFoodOptions[Math.floor(Math.random() * this.survivalFoodOptions.length)]);
                }
                else {
                    this.foods.push(this.specialOptions[Math.floor(Math.random() * this.specialOptions.length)]);
                }
            }
        }
        if (format == 1 || format == 4){
            var foodNumber = (Math.random() - 0.4) * 2;
            for (i = 0; i < foodNumber; i++){
                this.foods.push(this.survivalFoodOptions[Math.floor(Math.random() * this.survivalFoodOptions.length)]);
            }
        }
        else if (format == 3 || format == 5){
            var foodNumber = (Math.random() - 0.5);
            for (i = 0; i < foodNumber; i++){
                this.foods.push(this.survivalFoodOptions[Math.floor(Math.random() * this.survivalFoodOptions.length)]);
            }
        }
        else if (format == 2){
            var foodNumber = (Math.random() * 2);
            for (i = 0; i < foodNumber; i++){
                this.foods.push(this.seaOptions[Math.floor(Math.random() * this.seaOptions.length)]);
            }
        }
        else if (format >= 7 && format <= 12){
            var foodNumber = (Math.random() - 0.4) * 2;
            for (i = 0; i < foodNumber; i++){
                this.foods.push(this.snackFoodOptions[Math.floor(Math.random() * this.snackFoodOptions.length)]);
            }
        }
        else {
            var foodNumber = Math.random() * 3;
            var i;
            for (i = 0; i < foodNumber; i++){
                var probability = Math.random();
                if (probability < 0.8){
                    this.foods.push(this.snackFoodOptions[Math.floor(Math.random() * this.snackFoodOptions.length)]);
                }
                else {
                    this.foods.push(this.specialOptions[Math.floor(Math.random() * this.specialOptions.length)]);
                }
            }
        }
    }

    hasFood(){
        return (this.foods.length != 0);
    }

    getFood(){
        if (this.foods.length == 0){
            return null;
        }
        else {
            var temp = this.foods[0];
            this.foods.shift();
            return temp;
        }
    }
}
export default MapElement;