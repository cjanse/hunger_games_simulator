
class Tribute {
    constructor(name, row, column){
        this.name = name;
        this.row = row;
        this.column = column;
        this.isAlive = true;
    }

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

    getRow(){
        return this.row;
    }

    getColumn(){
        return this.column;
    }

    getName(){
        return this.name;
    }

    setIsAlive(value){
        this.isAlive = value;
    }

    getIsAlive(){
        return this.isAlive;
    }

    getMapName(){
        if (this.name.length < 6){
            return this.name;
        }
        else {
            return this.name.substring(0,5);
        }
    }
   
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

}
export default Tribute; 