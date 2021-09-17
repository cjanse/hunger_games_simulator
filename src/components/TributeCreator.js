import MainMenu from "./MainMenu"
import React from "react"

/**
* This class allows user to create tributes to participate in the game.
*/
const TributeCreator = (props) => {
    name = "nobody"
    function changeName(){
        const log = document.getElementById("Name")
        name = "Carter"
        name = log.textContent
        console.log(name)
    }

    return (
        <>
        <div>TributeCreator.js</div>
        <div className = "bg-gray-400 h-screen">
            <div class = "grid grid-flow-col grid-cols-2 justify-items-center">
                <div>
                <div>Choose Tribute Name</div>
                <div>
                {name}
                <input type="text" placeHolder="Name" id="Name" className = "w-52 p-2 border-2 border-gray-300"/>
                </div>
                </div>
                <div>
                <div className="text-center">Choose Aggressive Level</div>
                <div class = "grid grid-flow-col grid-cols-3 justify-items-center">
                <button className="w-48 bg-red-500 text-white font-bold rounded-lg text-xl p-4 hover:bg-red-700 text-center" onClick={changeName}>1</button>
                <div className="w-48 bg-red-500 text-white font-bold rounded-lg text-xl p-4 hover:bg-red-700 text-center">2</div>
                <div className="w-48 bg-red-500 text-white font-bold rounded-lg text-xl p-4 hover:bg-red-700 text-center">3</div>
                </div>
                <div class = "grid grid-flow-col grid-cols-2 justify-items-center">
                <div className="w-48 bg-red-500 text-white font-bold rounded-lg text-xl p-4 hover:bg-red-700 text-center">4</div>
                <div className="w-48 bg-red-500 text-white font-bold rounded-lg text-xl p-4 hover:bg-red-700 text-center">5</div>
                </div>
                </div>
            </div>
            <div className="text-center"></div>
            <div className="w-64 bg-yellow-300"></div>
            <div class = "grid grid-flow-col grid-cols-1 justify-items-center">
            <div className="justify-items-center w-64 bg-yellow-300 text-center">Current Tributes:</div>
            <div>{name}</div>
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