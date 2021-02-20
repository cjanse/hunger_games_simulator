const EndGame = (props) => {

    return(
    <>
    <>
          <div className = "bg-gray-400 flex flex-col flex-center justify-center h-screen">
          <div className = "flex flex-col text-center items-center">
            <div className="bg-gray-400">
            <div className="text-7xl font-bold italic mb-4 rounded-lg bg-yellow-700 text-white">Game Over!</div>
            <div>{props.game1.getGameOverMessage()}</div>
            <button
              className="w-48 bg-indigo-500 text-white font-bold rounded-lg text-xl p-4 hover:bg-indigo-700"
              onClick={props.stop}
            >Return to home screen</button>
            </div>
          </div>
          </div>
        </>
    </>
    )
}

export default EndGame;