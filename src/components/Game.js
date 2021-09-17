import MapElement from "./MapElement"
import Tribute from "./Tribute"
import Messages from "./Messages"

const GAME_LENGTH = 11;
/**
* Class that controls main functionality of the game
*/
class Game {

    constructor(){
        console.log("Constructor");
        this.map = [];
        this.tributes = [];
        this.day = 0;
        this.tributeIndex = 0;
        this.message = "AND MAY THE ODDS BE EVER IN YOUR FAVOR";
        this.inSurvival = false;
        this.inBattle = false;
        this.messages = new Messages();

        //making tribute list
        this.tributes.push(new Tribute("Carter",2));//2
        this.tributes.push(new Tribute("Skylar",5));//5
        this.tributes.push(new Tribute("Ashley",5));//5
        this.tributes.push(new Tribute("Salonee",4));//4
        this.tributes.push(new Tribute("Christopher",1));//1
        this.tributes.push(new Tribute("Snowball",1));//1
        this.tributes.push(new Tribute("Pounce",3));//3
        this.tributes.push(new Tribute("Bella",5));//5
        this.tributes.push(new Tribute("Samara",4));

        this.createMap(0);
        this.placeTributes();
        
    }

    //Creates map based upon user choice
    createMap(mapChoice) {
        var i;
        var j;
        for (i = 0; i < GAME_LENGTH; i++){
            let temp = [];
            for (j = 0; j < GAME_LENGTH; j++){
                if (i == 5 && j == 5){
                    temp.push(new MapElement(0));
                } 
                else {
                    temp.push(new MapElement(1));
                }
            }
            this.map.push(temp);
        }

        if (mapChoice == 0){
            //adds house to map
            this.map[0][1] = new MapElement(6);
            this.map[1][1] = new MapElement(6);
            this.map[2][1] = new MapElement(6);
            this.map[2][3] = new MapElement(6);
            this.map[2][3] = new MapElement(6);
            this.map[1][3] = new MapElement(7);
            this.map[0][3] = new MapElement(8);
            this.map[0][2] = new MapElement(9);
            this.map[1][2] = new MapElement(9);
            this.map[2][2] = new MapElement(10);

            //constructs park
            this.map[7][1] = new MapElement(11);
            this.map[7][2] = new MapElement(11);
            this.map[8][1] = new MapElement(11);
            this.map[8][2] = new MapElement(11);
            this.map[6][1] = new MapElement(12);
            this.map[6][2] = new MapElement(12);
            this.map[9][1] = new MapElement(3);
            this.map[9][2] = new MapElement(3);
            
            //constructs pond
            this.map[8][4] = new MapElement(2);
            this.map[8][5] = new MapElement(2);
            this.map[9][4] = new MapElement(2);
            this.map[9][5] = new MapElement(2);

            //constructs forest
            var i;
            var j;
            for (i = 0; i < GAME_LENGTH; i++){
                for (j = 7; j < GAME_LENGTH; j++){
                    this.map[i][j] = new MapElement(4);
                }
            }
            this.map[1][9] = new MapElement(2);

            //adds snow in corner
            this.map[10][10] = new MapElement(5);
            this.map[9][10] = new MapElement(5);
            this.map[10][9] = new MapElement(5);
            this.map[8][10] = new MapElement(5);
            this.map[10][8] = new MapElement(5);
            this.map[9][9] = new MapElement(5);
        }

        this.setAllWaterRefillStations();
    }

    //Determines where all the places that tributes can get water based
    //on created map elements
    setAllWaterRefillStations(){
        var i;
        var j;
        for (i = 0; i < GAME_LENGTH; i++){
            for (j = 0; j < GAME_LENGTH; j++){
                if (this.map[i][j].getLocation() == "kitchen" || this.map[i][j].getLocation() == "bathroom"){
                    this.map[i][j].setRefillWaterStation(true);
                }
                else if (this.map[i][j].getLocation() == "water"){
                    var x;
                    var y;
                    for (x = i - 1; x <= i + 1; x++){
                        for (y = j - 1; y <= j + 1; y++){
                            if (x >= 0 && y >= 0 && x < GAME_LENGTH && y < GAME_LENGTH){
                                this.map[x][y].setRefillWaterStation(true);
                            }
                        }
                    }
                }
            }
        }
    }

    //Places tributes on the created map
    placeTributes() {
        //establishes tribute's initial positions
        var i;
        var x = 4;
        var y = 4;
        for (i = 0; i <this.tributes.length; i++){
            if (x == 4 && y < 6){
                this.tributes[i].setRow(x);
                this.tributes[i].setColumn(y);
                y++;
            }
            else if (x < 6 && y == 6){
                this.tributes[i].setRow(x);
                this.tributes[i].setColumn(y);
                x++;
            }
            else if (x == 6 && y > 4){
                this.tributes[i].setRow(x);
                this.tributes[i].setColumn(y);
                y--;
            }
            else {
                this.tributes[i].setRow(x);
                this.tributes[i].setColumn(y);
                x--;
            }
        }

        //places tributes on map
        var i;
        for (i = 0; i < this.tributes.length; i++){
            this.map[this.tributes[i].getRow()][this.tributes[i].getColumn()].addTributeName(this.tributes[i].getMapName());
        }
    }

    //Moves tributes either randomly or intelligently based upon
    //determined factors in the game
    moveTribute() {
        this.map[this.tributes[this.tributeIndex].getRow()][this.tributes[this.tributeIndex].getColumn()].removeTributeName(this.tributes[this.tributeIndex].getMapName());
        console.log("Tribute: " + this.tributes[this.tributeIndex].getMapName() + "\t position: " + this.tributes[this.tributeIndex].getRow() + "," + this.tributes[this.tributeIndex].getColumn());
        var target = this.findTarget();
        if (target[0] == -1){      
            this.tributes[this.tributeIndex].move();
            this.tributes[this.tributeIndex].move();
            this.tributes[this.tributeIndex].move();
        }
        else {
            this.smartMoveTribute(target);
        }
        console.log("Tribute: " + this.tributes[this.tributeIndex].getMapName() + "\t position: " + this.tributes[this.tributeIndex].getRow() + "," + this.tributes[this.tributeIndex].getColumn());
        this.searchForWater();
        this.map[this.tributes[this.tributeIndex].getRow()][this.tributes[this.tributeIndex].getColumn()].addTributeName(this.tributes[this.tributeIndex].getMapName());  
        this.message = this.messages.getMoveMessage(this.tributes[this.tributeIndex],this.map);
        this.inSurvival = true;
    }

    //Moves tribute towards a specific target without exceeding a tribute's range
    smartMoveTribute(target){
        var i;
        var j;
        var bestPlacement = [-1,-1];
        var bestDistance = -1;
        for (i = this.tributes[this.tributeIndex].getRow() - 3; i <= this.tributes[this.tributeIndex].getRow() + 3; i++){
            for (j = this.tributes[this.tributeIndex].getColumn() - 3; j <= this.tributes[this.tributeIndex].getColumn() + 3; j++){
                if (i >= 0 && j >= 0 && i < GAME_LENGTH && j < GAME_LENGTH){
                    if (target[2] == 1){
                        if (bestDistance == -1 || bestDistance > Math.sqrt((i-target[0])*(i-target[0]) + (j-target[1])*(j-target[1]))){
                            bestPlacement = [i,j];
                            bestDistance = Math.sqrt((i-target[0])*(i-target[0]) + (j-target[1])*(j-target[1]));
                        }
                    }
                    else {
                        if (bestDistance == -1 || bestDistance < Math.sqrt((i-target[0])*(i-target[0]) + (j-target[1])*(j-target[1]))){
                            bestPlacement = [i,j];
                            bestDistance = Math.sqrt((i-target[0])*(i-target[0]) + (j-target[1])*(j-target[1]));
                        }
                    }
                }
            }
        }
        this.tributes[this.tributeIndex].setRow(bestPlacement[0]);
        this.tributes[this.tributeIndex].setColumn(bestPlacement[1]);
    }

    //Determines where the tribute wants to go 
    //based on determined factors
    // returns a target with [x coordinate, y coordinate, whether to go towards target or away (-1 for away, 1 for torwards)]
    findTarget(){
        var doesAggressiveMove = this.aggressiveMoveCalculator();
        if (this.tributes.length == 2) {
            var tributePlaces = this.findAllTributes();
            if (tributePlaces.length == 0){
                return [5,5,1]
            }
            else{
                target = tributePlaces[0]
                target.push(1)
                return target
            }
        }
        if (this.day == 0){
            if (doesAggressiveMove == 1){
                return [5,5,1];
            }
            else if (doesAggressiveMove == -1){
                return [5,5,-1];
            }
            else {
                return [-1,-1];
            }
        }
        if (this.tributes[this.tributeIndex].getWaterMeter() <= 0.33){
            if (this.tributes[this.tributeIndex].getWaterMemory().length > 0){
                var target = this.findNearestWaterFromMemory();
                target.push(1);
                return target;
            }
        }
        else if (this.tributes) {
            if (this.tributes[this.tributeIndex].getFoodMeter() <= 0.20){
                var target = this.findNearestFood();
                target.push(1);
                return target;
            }
        } 
        if (doesAggressiveMove == 1){
            var tributePlaces = this.findAllTributes();
            if (tributePlaces.length > 0){
                var target = tributePlaces[Math.floor(Math.random() * Math.floor(tributePlaces.length))];
                target.push(1);
                return target;
            }
        }
        else if (doesAggressiveMove == -1){
            var tributePlaces = this.findAllTributes();
            if (tributePlaces.length > 0){
                var target = this.findMidPoint(tributePlaces);
                target.push(-1);
                return target;
            }
        }
        return [-1,-1];
    }

    //Finds the midpoint of all tribute's target places
    findMidPoint(tributePlaces){
        var i;
        var xSum = 0;
        var ySum = 0;
        for (i = 0; i < tributePlaces.length; i++){
            xSum += tributePlaces[i][0];
            ySum += tributePlaces[i][1];
        }
        return [xSum/tributePlaces.length,ySum/tributePlaces.length];
    }

    //Finds all the tributes within the "eye sight" of a tribute
    findAllTributes(){
        var tributePlaces = [];
        var i;
        var j;
        for (i = this.tributes[this.tributeIndex].getRow() - 2; i <= this.tributes[this.tributeIndex].getRow() + 2; i++){
            for (j = this.tributes[this.tributeIndex].getColumn() - 2; j <= this.tributes[this.tributeIndex].getColumn() + 2; j++){
                if (i >= 0 && j >= 0 && i < GAME_LENGTH && j < GAME_LENGTH){
                    if (this.map[i][j].findTributeName(this.tributes[this.tributeIndex].getMapName()) != ""){
                        tributePlaces.push([i,j]);
                    }
                }
            }
        }
        return tributePlaces;
    }

    //Finds all water refill spots within the "eye sight" of a tribute
    searchForWater(){
        var i;
        var j;
        for (i = this.tributes[this.tributeIndex].getRow() - 2; i <= this.tributes[this.tributeIndex].getRow() + 2; i++){
            for (j = this.tributes[this.tributeIndex].getColumn() - 2; j <= this.tributes[this.tributeIndex].getColumn() + 2; j++){
                if (i >= 0 && j >= 0 && i < GAME_LENGTH && j < GAME_LENGTH){
                    if (this.map[i][j].getRefillWaterStation()){
                        this.tributes[this.tributeIndex].addWaterMemory([i,j]);
                    }
                }
            }
        }
    }

    //Finds the nearest food spot within the "eye sight" of a tribute
    findNearestFood(){
        var i;
        var j;
        for (i = this.tributes[this.tributeIndex].getRow() - 2; i <= this.tributes[this.tributeIndex].getRow() + 2; i++){
            for (j = this.tributes[this.tributeIndex].getColumn() - 2; j <= this.tributes[this.tributeIndex].getColumn() + 2; j++){
                if (i >= 0 && j >= 0 && i < GAME_LENGTH && j < GAME_LENGTH){
                    if (this.map[i][j].hasFood()){
                        return [i,j];
                    }
                }
            }
        }
        return [-1,-1];
    }

    //Finds the nearest water refill spot from tribute memory
    findNearestWaterFromMemory(){
        var bestDistance = -1;
        var target = [-1,-1];
        var i;
        var waterMemory = this.tributes[this.tributeIndex].getWaterMemory()
        for (i = 0; i < this.tributes[this.tributeIndex].getWaterMemory().length; i++){
            if (bestDistance == -1 || bestDistance > Math.sqrt((waterMemory[i][0]-this.tributes[this.tributeIndex].getRow())*(waterMemory[i][0]-this.tributes[this.tributeIndex].getRow()) + (waterMemory[i][1]-this.tributes[this.tributeIndex].getColumn()) * (waterMemory[i][1]-this.tributes[this.tributeIndex].getColumn()))){
                bestDistance = Math.sqrt((waterMemory[i][0]-this.tributes[this.tributeIndex].getRow())*(waterMemory[i][0]-this.tributes[this.tributeIndex].getRow()) + (waterMemory[i][1]-this.tributes[this.tributeIndex].getColumn()) * (waterMemory[i][1]-this.tributes[this.tributeIndex].getColumn()));
                target[0] = waterMemory[i][0];
                target[1] = waterMemory[i][1];
            }
        }
        return target;
    }

    //Determines whether or not tribute will be aggressive with probabilities
    //based on tribute's aggressive ranking
    aggressiveMoveCalculator(){
        //1 = aggressive move, 0 = not aggressive or inaggressive, -1 = inaggressive move
        var pureProbability = Math.random();
        if (this.tributes[this.tributeIndex].getAggressiveness() == 1){
            if (pureProbability >= 0.95){
                return 1;
            }
            else if (pureProbability >= 0.5){
                return 0;
            }
            else {
                return -1;
            }
        }
        else if (this.tributes[this.tributeIndex].getAggressiveness() == 2){
            if (pureProbability >= 0.90){
                return 1;
            }
            else if (pureProbability >= 0.35){
                return 0;
            }
            else {
                return -1;
            }
        }
        else if (this.tributes[this.tributeIndex].getAggressiveness() == 3){
            if (pureProbability >= 0.80){
                return 1;
            }
            else if (pureProbability >= 0.20){
                return 0;
            }
            else {
                return -1;
            }
        }
        else if (this.tributes[this.tributeIndex].getAggressiveness() == 4){
            if (pureProbability >= 0.65){
                return 1;
            }
            else if (pureProbability >= 0.10){
                return 0;
            }
            else {
                return -1;
            }
        }
        else {
            if (pureProbability >= 0.50){
                return 1;
            }
            else if (pureProbability >= 0.05){
                return 0;
            }
            else {
                return -1;
            }
        }
    }

    //Carries out tribute's survival stage of their turn
    tributeEnviroSurvival(){    
        var foodOrWater = 0;
        if (this.map[this.tributes[this.tributeIndex].getRow()][this.tributes[this.tributeIndex].getColumn()].getRefillWaterStation()){
            this.tributes[this.tributeIndex].adjustWaterMeter(1.0);
            foodOrWater = 1;
        }
        var food = this.map[this.tributes[this.tributeIndex].getRow()][this.tributes[this.tributeIndex].getColumn()].getFood();
        if (food != null){
            this.tributes[this.tributeIndex].adjustFoodMeter(food[2]);
            foodOrWater = 2;
        }
        if (Math.random() < 0.05 && this.day != 0){ 
            this.tributes[this.tributeIndex].setIsAlive(false);
            this.message = this.messages.getDeathEnviroMessage(this.tributes[this.tributeIndex]);
            this.map[this.tributes[this.tributeIndex].getRow()][this.tributes[this.tributeIndex].getColumn()].removeTributeName(this.tributes[this.tributeIndex].getMapName());
            this.tributeIndex++;
        }
        else if (this.tributes[this.tributeIndex].getFoodMeter() <= 0){
            this.tributes[this.tributeIndex].setIsAlive(false);
            this.message = this.messages.getHungerDeathMessage(this.tributes[this.tributeIndex]);
            this.map[this.tributes[this.tributeIndex].getRow()][this.tributes[this.tributeIndex].getColumn()].removeTributeName(this.tributes[this.tributeIndex].getMapName());
            this.tributeIndex++;
        }
        else if (this.tributes[this.tributeIndex].getWaterMeter() <= 0){
            this.tributes[this.tributeIndex].setIsAlive(false);
            this.message = this.messages.getDehydrationDeathMessage(this.tributes[this.tributeIndex]);
            this.map[this.tributes[this.tributeIndex].getRow()][this.tributes[this.tributeIndex].getColumn()].removeTributeName(this.tributes[this.tributeIndex].getMapName());
            this.tributeIndex++;
        }
        else {
            if (foodOrWater == 0) {
                this.message = this.messages.getGeneralEnviroMessage(this.tributes[this.tributeIndex]);
            }
            else if (foodOrWater == 1) {
                this.message = this.messages.getDrinkingWaterMessage(this.tributes[this.tributeIndex],this.map);
            }
            else {
                 this.message = this.messages.getEatingMessage(this.tributes[this.tributeIndex], food);
            }

            this.tributes[this.tributeIndex].adjustFoodMeter(-0.21);
            this.tributes[this.tributeIndex].adjustWaterMeter(-0.34);
            this.inBattle = true;
        }
        this.inSurvival = false;
    }

    //finds tribute based on their name
    findTribute(name){
        var i;
        for (i = 0; i < this.tributes.length; i++){
            if (this.tributes[i].getMapName() == name){
                return this.tributes[i];
            }
        }
    }

    //Carries out tribute's battle stage of turn
    tributeBattle(){
        var weapon = this.map[this.tributes[this.tributeIndex].getRow()][this.tributes[this.tributeIndex].getColumn()].getWeapon();
        var otherTributeName = this.map[this.tributes[this.tributeIndex].getRow()][this.tributes[this.tributeIndex].getColumn()].findAnotherTributeNameAtSpot(this.tributes[this.tributeIndex].getMapName());
        if (weapon != null){
            this.message = this.messages.getWeaponFoundMessage(this.tributes[this.tributeIndex],weapon);
            this.tributes[this.tributeIndex].addWeapon(weapon);
        }
        else if (otherTributeName == ""){
            this.message = this.messages.getGeneralBattleMessage(this.tributes[this.tributeIndex]);
        }
        
        if (otherTributeName != "") {
            var otherTribute = this.findTribute(otherTributeName);
            var otherTributeWeapon = otherTribute.getBestWeapon();
            var tributeWeapon = this.tributes[this.tributeIndex].getBestWeapon();
            if (Math.random() + tributeWeapon[0] > Math.random() + otherTributeWeapon[0]){
                otherTribute.setIsAlive(false);
                this.map[this.tributes[this.tributeIndex].getRow()][this.tributes[this.tributeIndex].getColumn()].removeTributeName(otherTribute.getMapName());
                this.message = this.messages.getKilledMessage(this.tributes[this.tributeIndex],otherTribute);
            }
            else {
                this.tributes[this.tributeIndex].setIsAlive(false);
                this.map[this.tributes[this.tributeIndex].getRow()][this.tributes[this.tributeIndex].getColumn()].removeTributeName(this.tributes[this.tributeIndex].getMapName());
                this.message = this.messages.getKilledMessage(otherTribute, this.tributes[this.tributeIndex]);
            }
        }
        this.inBattle = false;

    }

    //finds all dead tributes and removes them from the game
    removeDeadTributes() {
        var i;
        var tempTribute;
        if (this.tributes.length == 0) {
            return;
        }
        var initialLength = this.tributes.length;
        for (i = 0; i < initialLength; i++){
            tempTribute = this.tributes.shift();
            if (tempTribute.getIsAlive()){
                this.tributes.push(tempTribute);
            }
        }
    }
    
    //main function that controls the flow of the game
    continueGame() {
        if (this.tributeIndex < this.tributes.length){
            if (this.tributes[this.tributeIndex].getIsAlive() == false){
                this.tributeIndex++;
                this.continueGame();
                return;
            }
            if (this.inSurvival){
                this.tributeEnviroSurvival();
            }
            else if (this.inBattle){
                this.tributeBattle();
                this.tributeIndex++;
            }
            else {
                this.moveTribute();
            }
            
        }
        else {
            this.tributeIndex = 0;
            this.removeDeadTributes();
            this.day++;
            this.message = this.messages.getEndOfDayMessage(this.day);
        }
    }

    //returns a specific map element based on a certain row and column
    getMapElement(row, column){
        return this.map[row][column];
    }

    //returns message
    getMessage(){
        return this.message;
    }

    //returns length of tribute
    getTributesLength(){
        return this.tributes.length;
    }

    //returns a game over message once there is <= 1 tributes in the game
    getGameOverMessage(){
        var gameOverMessage = "";
        if (this.tributes.length == 1){
            gameOverMessage += this.tributes[0].getName() + " is the winner!"
        }
        else {
            gameOverMessage += "There is no winner.";
        }
        return gameOverMessage;
    }
}
export default Game;