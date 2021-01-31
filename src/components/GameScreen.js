import MapScreen from "./MapScreen"

const GameScreen = (props) => { 
    return (
        <>
        <div className = "bg-gray-400 flex flex-col flex-center justify-center h-screen">
        <div className = "flex flex-col text-center items-center">
        <MapScreen game1={props.game1}/>
        <div>Gamescreen.js</div>
        </div>
        </div>
        </>
    )
}

export default GameScreen;