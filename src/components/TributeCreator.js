import MainMenu from "./MainMenu"
import React from "react"

const TributeCreator = (props) => {

    return (
        <>
        <div>TributeCreator.js</div>
        <button
              className="w-48 bg-indigo-500 text-white font-bold rounded-lg text-xl p-4 hover:bg-indigo-700"
              onClick={props.backToMainMenu}
            >Back to Main Menu!</button>
        </>
    )
}

export default TributeCreator;