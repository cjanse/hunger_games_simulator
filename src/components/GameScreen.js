import MapScreen from "./MapScreen"
import Game from "../components/Game"
import React from "react"

const GameScreen = (props) => {
    
    const [updating, isUpdating] = React.useState(false);

    function accessContinueGame(){ 
        if (!updating)
        {isUpdating(true);
        props.game1.continueGame();
        console.log("AccessContinueGame");
        }
        else {
        isUpdating(false);
      }
    }

    return (
        <>
        <div className = "bg-gray-400 flex flex-col flex-center justify-center h-screen">
        <div className = "flex flex-col text-center items-center">
        <div>
        {updating ? (<div>Click Next Again.</div>) //error with moving tributes... possibly because MapScreen does not update after every turn... also, this.tributeIndex is also not updating... 
      : (
        <MapScreen game1={props.game1}/>
      )}
        </div>
        <div className = "flex space-x-5">
        <div className="bg-white flex text-center justify-center place-items-center">{props.game1.getMessage()}</div>
        <button className="bg-red-400 w-16 h-12 rounded-lg text-xl hover:bg-red-600" onClick={accessContinueGame}>Next</button>
        </div>
        </div>
        </div>
        </>
    )
}

export default GameScreen;