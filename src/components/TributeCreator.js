import MainMenu from "./MainMenu"
import React from "react"

/**
* This class allows user to create tributes to participate in the game.
*/
const TributeCreator = (props) => {

    return (
        <>
        <div>TributeCreator.js</div>
        <div className = "bg-gray-400 h-screen">
            <div class = "grid grid-flow-col grid-cols-2 justify-items-center">
                <div>
                <div>Choose Tribute Name</div>
                <div>Insert Tribute Name box</div>
                </div>
                <div>
                <div>Choose Aggressive Level</div>
                <div class = "grid grid-flow-col grid-cols-3 justify-items-center">
                <div className="w-48 bg-red-500 text-white font-bold rounded-lg text-xl p-4 hover:bg-red-700 text-center">1</div>
                <div className="w-48 bg-red-500 text-white font-bold rounded-lg text-xl p-4 hover:bg-red-700 text-center">2</div>
                <div className="w-48 bg-red-500 text-white font-bold rounded-lg text-xl p-4 hover:bg-red-700 text-center">3</div>
                </div>
                <div class = "grid grid-flow-col grid-cols-2 justify-items-center">
                <div className="w-48 bg-red-500 text-white font-bold rounded-lg text-xl p-4 hover:bg-red-700 text-center">4</div>
                <div className="w-48 bg-red-500 text-white font-bold rounded-lg text-xl p-4 hover:bg-red-700 text-center">5</div>
                </div>
                </div>
            </div>
            <div class = "grid grid-flow-col grid-cols-1 justify-items-center">
                <button
              className="w-48 bg-indigo-500 text-white font-bold rounded-lg text-xl p-4 hover:bg-indigo-700"
              onClick={props.backToMainMenu}
            >Back to Main Menu!</button>
            </div>
        </div>
        </>
    )
}

export default TributeCreator;