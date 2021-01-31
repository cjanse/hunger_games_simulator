import MapElement from "./MapElement"

class Game {
    constructor(){
        this.map = [];

        //making array ~~would rather do this in createMap() but am not able to currently
        var i;
        var j;
        for (i = 0; i < 11; i++){
            let temp = [];
            for (j = 0; j < 11; j++){
                if (i == 5 && j == 5){
                    temp.push(new MapElement("w-12 h-12 box-border border-2 flex justify-center place-items-center text-xs bg-green-500", "C-copia"));
                } 
                else {
                    temp.push(new MapElement("w-12 h-12 box-border border-2 flex justify-center place-items-center bg-green-500", i + ", " + j));
                }
            }
            this.map.push(temp);
        }
        console.log(this.map[0][0].getFormat());
    }

    createMap() {
        //Not working???
        var i;
        var j;
        for (i = 0; i < 3; i++){
            let temp = [];
            for (j = 0; j < 3; j++){
                temp.push(new MapElement("flex justify-center bg-green-500 place-items-center", "hola"));
            }
            this.map.push(temp);
        }
        console.log(this.map[0][0].getFormat());
        return this.map;
    }

    getMapElement(row, column){
        return this.map[row][column];
    }
}
export default Game;