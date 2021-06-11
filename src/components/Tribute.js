
/**
* This class groups all of the characteristics of one tribute together.
*/
class Tribute {
    constructor(name, aggresiveness){
        this.name = name;
        this.row = -1;
        this.column = -1;
        this.foodMeter = 1.00;
        this.waterMeter = 1.00;
        this.isAlive = true;
        this.aggresiveness = aggresiveness;
        this.waterMemory = [];
        this.weaponInventory = [[0,"hands"]];
    }

    //Determines if tribute is moving forwards, backwards, or not at all
    //for either row or column.
    directionMove(range){
        if (range == 1){
            if (Math.random() > 0.5){
                return 1;
            }
            else {
                return 0;
            }
        }
        else if (range == -1){
            if (Math.random() > 0.5){
                return -1;
            }
            else {
                return 0;
            }
        }
        else {
            var probability = Math.random();
            if (probability > (2/3)){
                return 1;
            }
            else if (probability > (1/3)){
                return 0;
            }
            else {
                return -1;
            }

        }
    }

    //changes row value for tribute as desired
    setRow(value){
        this.row = value;
    }

    //changes column value for tribute as desired
    setColumn(value){
        this.column = value;
    }

    //returns row position of tribute
    getRow(){
        return this.row;
    }

    //returns column position of tribute
    getColumn(){
        return this.column;
    }

    //return tribute's name
    getName(){
        return this.name;
    }

    //changes living status for tribute as desired
    setIsAlive(value){
        this.isAlive = value;
    }

    //returns living status for tribute
    getIsAlive(){
        return this.isAlive;
    }

    //returns tribute's food meter
    getFoodMeter(){
        return this.foodMeter;
    }

    //returns tribute's water meter
    getWaterMeter(){
        return this.waterMeter;
    }

    //returns tribute's aggresiveness ranking
    getAggressiveness(){
        return this.aggresiveness;
    }

    //changes tribute's food meter without going over 1 or below 0
    adjustFoodMeter(value){
        if (value + this.foodMeter >= 1.00){
            this.foodMeter = 1.00;
        }
        else if (value + this.foodMeter <= 0.0){
            this.foodMeter = 0.0;
        }
        else {
            this.foodMeter += value;
        }
    }

    //changes tribute's water meter without going over 1 or below 0
    adjustWaterMeter(value){
        if (value + this.waterMeter >= 1.00){
            this.waterMeter = 1.00;
        }
        else if (value + this.waterMeter <= 0.0){
            this.waterMeter = 0.0;
        }
        else {
            this.waterMeter += value;
        }
    }

    //allows user to remember a certain spot as a place to get more water
    addWaterMemory(value){
        var i;
        for (i = 0; i < this.waterMemory.length; i++){
            if (value[0] == this.waterMemory[i][0] && value[1] == this.waterMemory[i][1]){
                return;
            }
        }
        this.waterMemory.push(value);
    }
    
    //returns tribute's water memory
    getWaterMemory(){
        return this.waterMemory;
    }

    getMapName(){
        if (this.name.length < 6){
            return this.name;
        }
        else {
            return this.name.substring(0,5);
        }
    }
   
    //Moves tributes in a random direction without going out of bounds
    move(){
        if (this.row == 0){
            this.row += this.directionMove(1);
        }
        else if (this.row == 10){
            this.row += this.directionMove(-1);
        }
        else {
            this.row += this.directionMove(0);
        }
        if (this.column == 0){
            this.column += this.directionMove(1);
        }
        else if (this.column == 10){
            this.column += this.directionMove(-1);
        }
        else {
            this.column += this.directionMove(0);
        }
    }

    //adds weapon to tribute's weapon inventory
    addWeapon(weapon){
        this.weaponInventory.push(weapon);
    }

    //finds and returns tribute's strongest weapon
    getBestWeapon(){
        var bestWeapon = this.weaponInventory[0];
        var i;
        for (i = 0; i < this.weaponInventory.length; i++){
            if (bestWeapon[0] < this.weaponInventory[i][0]){
                bestWeapon = this.weaponInventory[i];
            }
        }
        return bestWeapon;
    }

}
export default Tribute; 