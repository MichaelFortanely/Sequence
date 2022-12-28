import './App.css';
import { useEffect, useState } from 'react';
import FlexRow from './FlexRow';
import SequenceBoard from './SequenceBoard';


function App() {
  const [chipCoords, setChipCoords] = useState([-1, -1])
  const chipToNum = {
    'all': -1,
    'open': 0,
    'red': 1,
    'blue': 2,
    'green': 3,  
  }
  const [grid, setGrid] = useState(new Array(10).fill(0).map(() => new Array(10).fill(0)))
  grid[0][0] = -1
  grid[0][9] = -1
  grid[9][0] = -1
  grid[9][9] = -1 
  console.log(grid)
  // useEffect(() => {
  //   console.log(chipCoords)
  //   const row = grid[chipCoords[0]]
  //   console.log(row)
  //   row[chipCoords[1]] = 3
  // }, [chipCoords ,grid])
  const nameRows = [
    ['red_joker.png', '4_of_spades.png', '3_of_spades.png', '2_of_spades.png', 'ace_of_spades.png', 'ace_of_clubs.png', '2_of_clubs.png', '3_of_clubs.png', '4_of_clubs.png', 'black_joker.png'],
    ['4_of_diamonds.png', 'king_of_spades.png', '5_of_spades.png', '6_of_spades.png', '7_of_spades.png', '7_of_clubs.png', '6_of_clubs.png', '5_of_clubs.png', 'king_of_clubs.png', '4_of_hearts.png'],
    ['3_of_diamonds.png', '5_of_diamonds.png', 'queen_of_spades.png', '9_of_spades.png', '8_of_spades.png', '8_of_clubs.png', '9_of_clubs.png', 'queen_of_clubs.png', '5_of_hearts.png', '3_of_hearts.png'],
    ['2_of_diamonds.png', '6_of_diamonds.png', '9_of_diamonds.png', 'queen_of_diamonds.png', '10_of_spades.png', '10_of_clubs.png', 'queen_of_hearts.png', '9_of_hearts.png', '6_of_hearts.png', '2_of_hearts.png'],
    ['ace_of_diamonds.png', '7_of_diamonds.png', '8_of_diamonds.png', '10_of_diamonds.png', 'king_of_diamonds.png', 'king_of_hearts.png', '10_of_hearts.png', '8_of_hearts.png', '7_of_hearts.png', 'ace_of_hearts.png'],
    ['ace_of_hearts.png', '7_of_hearts.png', '8_of_hearts.png', '10_of_hearts.png', 'king_of_hearts.png', 'king_of_diamonds.png', '10_of_diamonds.png', '8_of_diamonds.png', '7_of_diamonds.png', 'ace_of_diamonds.png'],
    ['2_of_hearts.png', '6_of_hearts.png', '9_of_hearts.png', 'queen_of_hearts.png', '10_of_clubs.png', '10_of_spades.png', 'queen_of_diamonds.png', '9_of_diamonds.png', '6_of_diamonds.png', '2_of_diamonds.png'],
    ['3_of_hearts.png', '4_of_hearts.png', 'queen_of_clubs.png', '9_of_clubs.png', '8_of_clubs.png', '8_of_spades.png', '9_of_spades.png', 'queen_of_spades.png', '5_of_diamonds.png', '3_of_diamonds.png'],
    ['4_of_hearts.png', 'king_of_clubs.png', '5_of_clubs.png', '6_of_clubs.png', '7_of_clubs.png', '7_of_spades.png', '6_of_spades.png', '5_of_spades.png', 'king_of_spades.png', '4_of_diamonds.png'],
    ['black_joker.png', '4_of_clubs.png', '3_of_clubs.png', '2_of_clubs.png', 'ace_of_clubs.png', 'ace_of_spades.png', '2_of_spades.png', '3_of_spades.png', '4_of_spades.png', 'red_joker.png'],
  ]

  return (
    <main>
      <table className="App">
        {[...Array(10).keys()].map(row => <FlexRow setChipCoords={setChipCoords} row={row} names={nameRows[row]} grid={grid}/>)}
      </table>`
         <SequenceBoard chipToNum={chipToNum} grid={grid} setGrid={setGrid}/>
    </main>
  );
}

export default App;
