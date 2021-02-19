import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from "react"
import MainMenu from "../components/MainMenu"
import GameScreen from "../components/GameScreen"
import Game from '../components/Game'

export default function Home() {

  const [simulating, setSimulating] = React.useState(false);
  function start(){
    setSimulating(true);
  }

  var game1 = new Game();

  return (
    <div>
      {simulating ? (<GameScreen game1={game1}/>)
      : (
        <MainMenu start={start}/>
      )}
    </div>
  )
}
