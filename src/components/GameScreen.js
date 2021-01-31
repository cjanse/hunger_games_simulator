import MapScreen from "./MapScreen"
import Game from "../components/Game"
import React from "react"

const GameScreen = (props) => {
    
    
    var isMapCreated = false
    function setIsMapCreatedTrue(){ //still not working
        isMapCreated = true;
    }

    function accessContinueGame(){ //THIS IS NOT WORKING T_T
        game1.continueGame();
        setIsMapCreatedTrue();
        console.log({isMapCreated})
    }

    const game1 = new Game;

    return (
        <>
        <div className = "bg-gray-400 flex flex-col flex-center justify-center h-screen">
        <div className = "flex flex-col text-center items-center">
        <div>
        {isMapCreated ? (<MapScreen game1={game1}/>)
        : (
        <></>
        )}
        </div>
        <div className = "flex space-x-5">
        <div className="bg-white flex text-center justify-center place-items-center">MESSAGE</div>
        <button className="bg-red-400 w-16 h-12 rounded-lg text-xl hover:bg-red-600" onClick={accessContinueGame}>Next</button>
        </div>
        </div>
        </div>
        </>
    )
}

export default GameScreen;