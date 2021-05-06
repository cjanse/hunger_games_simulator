import Tribute from "./Tribute"
import MapElement from "./MapElement"

class Messages {
    constructor(){}

    getMoveMessage(tribute, map){
        var tributePlace = map[tribute.getRow()][tribute.getColumn()];
        if (tribute.getWaterMeter() < 0.33){
            return tribute.getName() + " is very thirsty.";
        }
        else if (tribute.getFoodMeter() < 0.2){
            return tribute.getName() + " is very hungry.";
        }
        else if (tributePlace.getLocation() == "cornucopia"){
            return tribute.getName() + " is at the cornucopia.";
        }
        else if (tributePlace.getLocation() == "grass"){
            return tribute.getName() + " is on grass.";
        }
        else if (tributePlace.getLocation() == "water"){
            return tribute.getName() + " is in the water.";
        }
        else if (tributePlace.getLocation() == "sand"){
            return tribute.getName() + " is on sand.";
        }
        else if (tributePlace.getLocation() == "forest"){
            return tribute.getName() + " is in the forest.";
        }
        else if (tributePlace.getLocation() == "snow"){
            return tribute.getName() + " is in the snow.";
        }
        else if (tributePlace.getLocation() == "house"){
            return tribute.getName() + " is in the house.";
        }
        else if (tributePlace.getLocation() == "kitchen"){
            return tribute.getName() + " is in the kitchen.";
        }
        else if (tributePlace.getLocation() == "bathroom"){
            return tribute.getName() + " is in the bathroom.";
        }
        else if (tributePlace.getLocation() == "bedroom"){
            return tribute.getName() + " is in the bedroom.";
        }
        else if (tributePlace.getLocation() == "game room"){
            return tribute.getName() + " is in the game room.";
        }
        else if (tributePlace.getLocation() == "playground"){
            return tribute.getName() + " is on the playground.";
        }
        else {
            return tribute.getName() + " is by the swings.";
        }
    }
}
export default Messages;