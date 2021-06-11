import React from "react"
import MainMenu from "../components/MainMenu"
import GameScreen from "../components/GameScreen"
import Game from '../components/Game'
/**
* Class that is the base for all user interface classes...
*/
export default function Home() {

  const [simulating, setSimulating] = React.useState(false);
  function start(){
    setSimulating(true);
  }

  function stop(){
    console.log("stop")
    setSimulating(false);
  }

  var game1 = new Game();

  return (
    <div>
      {simulating ? (<GameScreen game1={game1} stop={stop}/>)
      : (
        <MainMenu start={start}/>
      )}
    </div>
  )
}
