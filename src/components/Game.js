import MapElement from "./MapElement"
import Tribute from "./Tribute"

const GAME_LENGTH = 11;

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

        //making tribute list
        this.tributes.push(new Tribute("Carter"));
        this.tributes.push(new Tribute("Skylar"));
        this.tributes.push(new Tribute("Ashley"));
        this.tributes.push(new Tribute("Salonee"));
        this.tributes.push(new Tribute("Christopher"));
        this.tributes.push(new Tribute("Snowball"));
        this.tributes.push(new Tribute("Pounce"));
        this.tributes.push(new Tribute("Bella"));

        this.createMap(0);
        this.placeTributes();
        
    }


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
        }
    }

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

    moveTribute() {
        this.map[this.tributes[this.tributeIndex].getRow()][this.tributes[this.tributeIndex].getColumn()].removeTributeName(this.tributes[this.tributeIndex].getMapName());
        console.log("Tribute: " + this.tributes[this.tributeIndex].getMapName() + "\t position: " + this.tributes[this.tributeIndex].getRow() + "," + this.tributes[this.tributeIndex].getColumn());
        this.tributes[this.tributeIndex].move();
        console.log("Tribute: " + this.tributes[this.tributeIndex].getMapName() + "\t position: " + this.tributes[this.tributeIndex].getRow() + "," + this.tributes[this.tributeIndex].getColumn());
        this.map[this.tributes[this.tributeIndex].getRow()][this.tributes[this.tributeIndex].getColumn()].addTributeName(this.tributes[this.tributeIndex].getMapName());  
        this.message ="Tribute: " + this.tributes[this.tributeIndex].getName() + "\t position: " + this.tributes[this.tributeIndex].getRow() + "," + this.tributes[this.tributeIndex].getColumn();
        this.inSurvival = true;
    }

    tributeEnviroSurvival(){
        if (Math.random() < 0.05){ 
            this.tributes[this.tributeIndex].setIsAlive(false);
            console.log(this.tributes[this.tributeIndex].getIsAlive());
            this.message ="Tribute: " + this.tributes[this.tributeIndex].getName() + " has tragically died from environmental factors.";
            this.map[this.tributes[this.tributeIndex].getRow()][this.tributes[this.tributeIndex].getColumn()].removeTributeName(this.tributes[this.tributeIndex].getMapName());
            this.tributeIndex++;
        }
        else {
            this.message ="Tribute: " + this.tributes[this.tributeIndex].getName() + " is living the best life.";
            this.inBattle = true;
        }
        this.inSurvival = false;
    }

    findTribute(name){
        var i;
        console.log(this.tributes.length);
        for (i = 0; i < this.tributes.length; i++){
            if (this.tributes[i].getMapName() == name){
                console.log("found Match!")
                return this.tributes[i];
            }
        }
    }

    tributeBattle(){
        var otherTributeName = this.map[this.tributes[this.tributeIndex].getRow()][this.tributes[this.tributeIndex].getColumn()].findAnotherTributeName(this.tributes[this.tributeIndex].getMapName());
        if (otherTributeName == ""){
            this.message ="Tribute: " + this.tributes[this.tributeIndex].getName() + " does not see anyone to kill.";
            this.inBattle = false;
            return;
        }
        else {
            var otherTribute = this.findTribute(otherTributeName);
            if (Math.random() > 0.5){
                otherTribute.setIsAlive(false);
                this.map[this.tributes[this.tributeIndex].getRow()][this.tributes[this.tributeIndex].getColumn()].removeTributeName(otherTribute.getMapName());
                this.message = this.tributes[this.tributeIndex].getName() + " killed " + otherTribute.getName();
            }
            else {
                this.tributes[this.tributeIndex].setIsAlive(false);
                this.map[this.tributes[this.tributeIndex].getRow()][this.tributes[this.tributeIndex].getColumn()].removeTributeName(this.tributes[this.tributeIndex].getMapName());
                this.message = otherTribute.getName() + " killed " + this.tributes[this.tributeIndex].getName();
            }
        }
        this.inBattle = false;

    }

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

    continueGame() {
        if (this.tributeIndex < this.tributes.length){
            console.log(this.tributes[this.tributeIndex].getIsAlive());
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
            this.message = "Finished day " + this.day;
        }
    }

    getMapElement(row, column){
        return this.map[row][column];
    }

    getMessage(){
        return this.message;
    }

    getTributesLength(){
        return this.tributes.length;
    }

    
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