import MapElement from "./MapElement"
import Tribute from "./Tribute"

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
        this.tributes.push(new Tribute("Carter",4,4));
        this.tributes.push(new Tribute("Skylar",4,5));
        this.tributes.push(new Tribute("Ashley",4,6));
        this.tributes.push(new Tribute("Salonee",5,6));
        this.tributes.push(new Tribute("Christopher",6,6));

        this.createMap();
        this.placeTributes();
        
    }

    createMap() {
        var i;
        var j;
        for (i = 0; i < 11; i++){
            let temp = [];
            for (j = 0; j < 11; j++){
                if (i == 5 && j == 5){
                    temp.push(new MapElement("w-16 h-16 box-border border-2 flex justify-center place-items-center text-xs bg-gray-500"));
                } 
                else {
                    temp.push(new MapElement("w-16 h-16 box-border border-2 flex justify-center place-items-center bg-green-500"));
                }
            }
            this.map.push(temp);
        }
    }

    placeTributes() {
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
        if (Math.random() < 0.2){
            this.tributes[this.tributeIndex].setIsAlive(false);
            console.log(this.tributes[this.tributeIndex].getIsAlive());
            this.message ="Tribute: " + this.tributes[this.tributeIndex].getName() + " has tragically died from environmental factors.";
            this.map[this.tributes[this.tributeIndex].getRow()][this.tributes[this.tributeIndex].getColumn()].removeTributeName(this.tributes[this.tributeIndex].getMapName());
        }
        else {
            this.message ="Tribute: " + this.tributes[this.tributeIndex].getName() + " is living the best life.";
        }
        this.inSurvival = false;
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
}
export default Game;