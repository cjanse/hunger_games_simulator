
class Tribute {
    constructor(name, row, column){
        this.name = name;
        this.row = row;
        this.column = column;
    }

    getRow(){
        return this.row;
    }

    getColumn(){
        return this.column;
    }

    getMapName(){
        if (this.name.length < 6){
            return this.name;
        }
        else {
            return this.name.substring(0,5);
        }
    }
}
export default Tribute; 