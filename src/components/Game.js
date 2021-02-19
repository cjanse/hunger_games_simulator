import MapElement from "./MapElement"
import Tribute from "./Tribute"

class Game {
    constructor(){
        console.log("Constructor");
        this.map = [];
        this.tributes = [];
        this.day = 0;
        this.tributeIndex = 0;
        this.message = "MESSAGE";

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

    continueGame() {
        console.log(this.tributeIndex);
        if (this.tributeIndex < this.tributes.length){
            this.map[this.tributes[this.tributeIndex].getRow()][this.tributes[this.tributeIndex].getColumn()].removeTributeName(this.tributes[this.tributeIndex].getMapName());
            console.log("Tribute: " + this.tributes[this.tributeIndex].getMapName() + "\t position: " + this.tributes[this.tributeIndex].getRow() + "," + this.tributes[this.tributeIndex].getColumn());
            this.tributes[this.tributeIndex].move();
            console.log("Tribute: " + this.tributes[this.tributeIndex].getMapName() + "\t position: " + this.tributes[this.tributeIndex].getRow() + "," + this.tributes[this.tributeIndex].getColumn());
            this.map[this.tributes[this.tributeIndex].getRow()][this.tributes[this.tributeIndex].getColumn()].addTributeName(this.tributes[this.tributeIndex].getMapName());
            this.tributeIndex++;
            //console.log(this.tributeIndex);
            this.message ="Tribute: " + this.tributes[this.tributeIndex - 1].getName() + "\t position: " + this.tributes[this.tributeIndex - 1].getRow() + "," + this.tributes[this.tributeIndex - 1].getColumn();
        }
        else {
            this.tributeIndex = 0;
            this.day++;
            this.message = "Finished day " + this.day;
        }
        console.log(this.tributeIndex);
        console.log("Do something");
    }

    getMapElement(row, column){
        return this.map[row][column];
    }

    getMessage(){
        return this.message;
    }
}
export default Game;