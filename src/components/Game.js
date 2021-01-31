import MapElement from "./MapElement"
import Tribute from "./Tribute"

class Game {
    constructor(){
        console.log("Constructor");
        this.map = [];
        this.tributes = [];
        this.day = 0;

        //making tribute list
        this.tributes.push(new Tribute("Carter",4,4));
        this.tributes.push(new Tribute("Skylar",4,5));
        this.tributes.push(new Tribute("Ashley",4,6));
        this.tributes.push(new Tribute("Salonee",5,6));
        this.tributes.push(new Tribute("Christopher",6,6));
        
    }

    createMap() {
        var i;
        var j;
        for (i = 0; i < 11; i++){
            let temp = [];
            for (j = 0; j < 11; j++){
                if (i == 5 && j == 5){
                    temp.push(new MapElement("w-16 h-16 box-border border-2 flex justify-center place-items-center text-xs bg-gray-500", ""));
                } 
                else {
                    temp.push(new MapElement("w-16 h-16 box-border border-2 flex justify-center place-items-center bg-green-500", ""));
                }
            }
            this.map.push(temp);
        }
        console.log(this.map[0][0].getMessage());
    }

    placeTributes() {
        var i;
        for (i = 0; i < this.tributes.length; i++){
            this.map[this.tributes[i].getRow()][this.tributes[i].getColumn()].setMessage(this.tributes[i].getMapName())
        }
    }

    continueGame() {
        if (this.day == 0){
            this.createMap();
            this.placeTributes();
            this.day++;
        }
        else {
            console.log("Do something")
        }
    }

    getMapElement(row, column){
        return this.map[row][column];
    }
}
export default Game;