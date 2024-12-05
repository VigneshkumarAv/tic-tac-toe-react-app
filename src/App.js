import './App.css';
import {useState} from "react";
function App() {
  return (
    <>
    <Game/>
    </>
  );
}
function Game(){
  
  const [history,setHistory] = useState([Array(9).fill(null)]);
  const [currentMove,setCurrentMove] = useState(0);
  const IsXNext = currentMove%2 === 0;
  const currentSquares = history[currentMove];
  const handleMove = (move) => {
    setCurrentMove(move);
  }
  const moves = history.map((square,move)=>{
    let description ="";
    if(move>0) {
      description = "Move to #"+move;
    }else {
      description = "Start the game";
    }
    return (
      <li key={move}>
        <button onClick={()=>handleMove(move)}>{description}</button>
      </li>
    )
  }) 
  const handlePlay = (nextSquares) => {
    const tempHistory = [...history.slice(0,currentMove+1),nextSquares];
    setHistory(tempHistory);
    setCurrentMove(tempHistory.length-1);
  }
  return (
    <>
      <div className='board'>
        <Board squares={currentSquares} IsXNext={IsXNext} onPlay={handlePlay} />
      </div>
      <div className='moves'>
          <ol>{moves}</ol>
      </div>
    </>
  )
}
function Board({squares, IsXNext, onPlay}) {
 
  const handleClick = (i) => {
    if(squares[i]|| calculateWinner(squares)) return; // if there is already value in a square dont update

    const square = squares.slice();
    if(IsXNext){
      square[i] ='X';
    }else {
      square[i] = 'O';
    }
    onPlay(square);
  }
  const winner = calculateWinner(squares);
  let status;
  
  if(winner){
    status = 'winner is '+ winner;
  } else if(squares.every(item => item != null)){
    status = 'Match is Draw';
  } else {
    status = <span>
      Next player is : {IsXNext?<b>X</b>:<b>O</b>}
    </span>
  }
  return (
    <div className='container'>
      <div className='status'><b>Status: </b>{status}</div>
      <div className='square-row'>
      <Square value={squares[0]} onSquareClick={()=>handleClick(0)}/> 
      <Square value={squares[1]} onSquareClick={()=>handleClick(1)}/> 
      <Square value={squares[2]} onSquareClick={()=>handleClick(2)}/> 
      </div>

      <div className='square-row'>
      <Square value={squares[3]} onSquareClick={()=>handleClick(3)}/> 
      <Square value={squares[4]} onSquareClick={()=>handleClick(4)}/> 
      <Square value={squares[5]} onSquareClick={()=>handleClick(5)}/> 
      </div>    

      <div className='square-row'>
      <Square value={squares[6]} onSquareClick={()=>handleClick(6)}/> 
      <Square value={squares[7]} onSquareClick={()=>handleClick(7)}/> 
      <Square value={squares[8]} onSquareClick={()=>handleClick(8)}/> 
      </div>    
    </div>
  )
}
function calculateWinner(squares){ //helper function
  const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

  for(let i=0;i<lines.length;i++){
  const [a,b,c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      return squares[a];
    }
  
  return null;
}
function Square({value,onSquareClick}){
  return (<button className='square' onClick={onSquareClick}>{value}</button>);
}
export default App;
