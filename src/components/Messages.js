import Tribute from "./Tribute"
import MapElement from "./MapElement"

/**
* This class contains all the messages that are printed during the game.
*/
class Messages {
    constructor(){}

    /**
    * This function randomly picks a message.
    */
    randomSelection(messages){
        return messages[Math.floor(Math.random()*message.length)];
    }

    /**
    * This function creates the message for whenever a tribute moves. It states if the
    * tribute is very thirsty or hungry. If the tribute is not thirsty or hungry, it 
    * states what biome they are on.
    */
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

    /**
    * creates message for death by hunger
    */
    getHungerDeathMessage(tribute){
        return tribute.getName() + " has tragically died from hunger.";
    }

    /**
    * creates message for death by dehydration
    */
    getDehydrationDeathMessage(tribute){
        return tribute.getName() + " has tragically died from dehydration.";
    }

    /**
    * creates a death message for random environmental factors
    */
    getDeathEnviroMessage(tribute){
        return tribute.getName() + " has died from nature."
    }

    /**
    * generates a random message if nothing significant
    * happens in the a tribute's survival turn
    */
    getGeneralEnviroMessage(tribute){
        return tribute.getName() + " is breathing."
    }

    /**
    * generates message for tribute drinking water
    */
    getDrinkingWaterMessage(tribute, map){
        var tributePlace = map[tribute.getRow()][tribute.getColumn()];
        return tribute.getName() + " is drinking water at " + tributePlace.getLocation() + ".";
    }

    /**
    * generates message for eating food
    */
    getEatingMessage(tribute, food){
        return tribute.getName() + " ate " + food[1] + ".";
    }
}
export default Messages;