import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { Square } from './components/Square'
import { TURNS } from './constants'
import { checkWinner, checkEndGame } from './logic/board'
import { WinnerModal } from './components/WinnerModal'
import { Board } from './components/Board'


function App(){
  const [ board, setBoard ] = useState(Array(9).fill(null))

  const [ turn, setTurn ] = useState(TURNS.X)
  //null = no hay ganador, false = empate
  const [ winner, setWinner ] = useState(null)

  
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const updateBoard = (index) => {
    //Se crea una copia del tablero, ya que no se puede modificar el estado directamente (inmutabilidad)
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', turn)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)

    if (newWinner){
      setWinner(newWinner)
      confetti()
    } else if (checkEndGame(newBoard)){
      setWinner(false) //empate
    }
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      
      <Board board={board} updateBoard={updateBoard}/>  
      
      <section className="turn">
        <Square isSelected = {turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected = {turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>  

      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  )
}

export default App