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
        this.weaponOptions = [[0.1,"dagger"],[0.3,"axe"],[0.5,"sword"]];
        this.foods = [];
        this.weapons = [];
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

    //returns format of map element 
    getFormat(){
        return this.format;
    }

    //returns message on map element (usually just tribute's name(s))
    getMessage(){
        var i;
        var message = "";
        for (i = 0; i < this.tributeNames.length; i++){
            message += this.tributeNames[i] + "\n";
        }
        return message;
    }

    //returns location name (name of biome essentially)
    getLocation(){
        return this.location;
    }

    //Determines whether this is a spot where tributes can get water
    setRefillWaterStation(value){
        this.refillWaterStation = value;
    }

    //returns whether this is a spot where tributes can get water
    getRefillWaterStation(){
        return this.refillWaterStation;
    }

    //adds tribute's name to map element
    addTributeName(tributeName){
        this.tributeNames.push(tributeName);
    }

    //removes tribute's name to map element
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

    //finds another tribute at random at spot
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

    //finds a specific tribute at spot
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

    //set message at spot
    setMessage(message){
        this.message = message;
    }

    //creates item (weapon and food) for spot
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
            var weaponNumber = Math.random() *10;
            for (i = 0; i < weaponNumber; i++){
                this.weapons.push(this.weaponOptions[Math.floor(Math.random() * this.weaponOptions.length)]);
            }
        }
        if (format == 1 || format == 4){
            var foodNumber = (Math.random() - 0.4) * 2;
            for (i = 0; i < foodNumber; i++){
                this.foods.push(this.survivalFoodOptions[Math.floor(Math.random() * this.survivalFoodOptions.length)]);
            }
            var weaponNumber = (Math.random() - 0.8);
            for (i = 0; i < weaponNumber; i++){
                this.weapons.push(this.weaponOptions[Math.floor(Math.random() * this.weaponOptions.length)]);
            }
        }
        else if (format == 3 || format == 5){
            var foodNumber = (Math.random() - 0.5);
            for (i = 0; i < foodNumber; i++){
                this.foods.push(this.survivalFoodOptions[Math.floor(Math.random() * this.survivalFoodOptions.length)]);
            }
            var weaponNumber = (Math.random() - 0.8);
            for (i = 0; i < weaponNumber; i++){
                this.weapons.push(this.weaponOptions[Math.floor(Math.random() * this.weaponOptions.length)]);
            }
        }
        else if (format == 2){
            var foodNumber = (Math.random() * 2);
            for (i = 0; i < foodNumber; i++){
                this.foods.push(this.seaOptions[Math.floor(Math.random() * this.seaOptions.length)]);
            }
            var weaponNumber = (Math.random() - 0.8);
            for (i = 0; i < weaponNumber; i++){
                this.weapons.push(this.weaponOptions[Math.floor(Math.random() * this.weaponOptions.length)]);
            }
        }
        else if (format >= 7 && format <= 12){
            var foodNumber = (Math.random() - 0.4) * 2;
            for (i = 0; i < foodNumber; i++){
                this.foods.push(this.snackFoodOptions[Math.floor(Math.random() * this.snackFoodOptions.length)]);
            }
            var weaponNumber = (Math.random() - 0.4) * 2;
            for (i = 0; i < weaponNumber; i++){
                this.weapons.push(this.weaponOptions[Math.floor(Math.random() * this.weaponOptions.length)]);
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
        var weaponNumber = (Math.random() - 0.8);
            for (i = 0; i < weaponNumber; i++){
                this.weapons.push(this.weaponOptions[Math.floor(Math.random() * this.weaponOptions.length)]);
            }
    }

    //Determines if there is food at spot
    hasFood(){
        return (this.foods.length != 0);
    }

    //Returns a food item at spot
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

    //Returns weapon at spot (if there is one)
    getWeapon(){
        if (this.weapons.length == 0){
            return null;
        }
        else {
            var temp = this.weapons[0];
            this.weapons.shift();
            return temp;
        }
    }
}
export default MapElement;