import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from "react"
import MainMenu from "../components/MainMenu"
import GameScreen from "../components/GameScreen"

export default function Home() {

  const [simulating, setSimulating] = React.useState(false);
  const start = () => {
    setSimulating(true);
  }

  return (
    <div>
      {simulating ? (<GameScreen/>)
      : (
        <MainMenu start={start}/>
      )}
    </div>
  )
}
