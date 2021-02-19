import MapScreen from "./MapScreen"
import OtherMapScreen from "./OtherMapScreen"
import Game from "../components/Game"
import React from "react"

const GameScreen = (props) => {

    const [hasWon, sethasWon] = React.useState(false);
    
    const [updating, isUpdating] = React.useState(false);

    function accessContinueGame(){ 
        isUpdating(!updating);
        props.game1.continueGame();
        }

    return (
        <>
        <div className = "bg-gray-400 flex flex-col flex-center justify-center h-screen">
        <div className = "flex flex-col text-center items-center">
        <div>
        {updating ? (<OtherMapScreen game1={props.game1}/>)  
      : (
        <MapScreen game1={props.game1}/>
      )}
        </div>
        <div className = "flex space-x-5">
        <div className="bg-white w-64 h-12 flex text-center justify-center place-items-center">{props.game1.getMessage()}</div>
        <button className="bg-red-400 w-16 h-12 rounded-lg text-xl hover:bg-red-600" onClick={accessContinueGame}>Next</button>
        </div>
        </div>
        </div>
        </>
    )
}

export default GameScreen;