import React from "react"
import TributeCreator from "./TributeCreator"
/**
* Displays main menu and is the first screen user interacts with
*/
const MainMenu = (props) => {
  
  const [creatingTributes, setCreatingTributes] = React.useState(false);
  const createTributes = () => {
    setCreatingTributes(true);
  }
  const backToMainMenu = () => {
    setCreatingTributes(false);
  }

    return (
      <>
      <div>
        {creatingTributes ? (<TributeCreator backToMainMenu={backToMainMenu}/>) : (
          <>
          <div className = "bg-gray-400 flex flex-col flex-center justify-center h-screen">
          <div className = "flex flex-col text-center items-center">
            <div className="bg-gray-400">
            <div className="text-7xl font-bold italic mb-4 rounded-lg bg-yellow-700 text-white">Hunger Games Simulator!</div>
            <button
              className="w-48 bg-indigo-500 text-white font-bold rounded-lg text-xl p-4 hover:bg-indigo-700"
              onClick={props.start}
            >BEGIN</button>
            <button
              className="w-48 bg-indigo-500 text-white font-bold rounded-lg text-xl p-4 hover:bg-indigo-700"
              onClick={createTributes}
            >Create Tributes</button>
            </div>
          </div>
          </div>
        </>
        )}
      </div>
      </>
    );
  };
  
  export default MainMenu;