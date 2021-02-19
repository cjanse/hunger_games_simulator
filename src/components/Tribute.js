
class Tribute {
    constructor(name, row, column){
        this.name = name;
        this.row = row;
        this.column = column;
    }

    directionMove(positiveOnly){
        if (positiveOnly){
            if (Math.random() > 0.5){
                return 1;
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
            this.row += this.directionMove(true);
        }
        else {
            this.row += this.directionMove(false);
        }
        if (this.column == 0){
            this.column += this.directionMove(true);
        }
        else {
            this.column += this.directionMove(false);
        }
    }

}
export default Tribute; 