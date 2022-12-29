import './App.css';
import { useEffect, useState } from 'react';
import FlexRow from './FlexRow';
import SequenceBoard from './SequenceBoard';
import Player from './Player'
import Popup from './Popup';

function App() {
  
  const namesOfAllCards = ['10_of_clubs.png', '10_of_diamonds.png', '10_of_hearts.png', '10_of_spades.png', '2_of_clubs.png', '2_of_diamonds.png', '2_of_hearts.png', '2_of_spades.png', '3_of_clubs.png', '3_of_diamonds.png', '3_of_hearts.png', '3_of_spades.png', '4_of_clubs.png', '4_of_diamonds.png', '4_of_hearts.png', '4_of_spades.png', '5_of_clubs.png', '5_of_diamonds.png', '5_of_hearts.png', '5_of_spades.png', '6_of_clubs.png', '6_of_diamonds.png', '6_of_hearts.png', '6_of_spades.png', '7_of_clubs.png', '7_of_diamonds.png', '7_of_hearts.png', '7_of_spades.png', '8_of_clubs.png', '8_of_diamonds.png', '8_of_hearts.png', '8_of_spades.png', '9_of_clubs.png', '9_of_diamonds.png', '9_of_hearts.png', '9_of_spades.png', 'ace_of_clubs.png', 'ace_of_diamonds.png', 'ace_of_hearts.png', 'ace_of_spades.png', 'black_joker.png', 'jack_of_clubs.png', 'jack_of_diamonds.png', 'jack_of_hearts.png', 'jack_of_spades.png', 'king_of_clubs.png', 'king_of_diamonds.png', 'king_of_hearts.png', 'king_of_spades.png', 'queen_of_clubs.png', 'queen_of_diamonds.png', 'queen_of_hearts.png', 'queen_of_spades.png', 'red_joker.png', '10_of_clubs.png', '10_of_diamonds.png', '10_of_hearts.png', '10_of_spades.png', '2_of_clubs.png', '2_of_diamonds.png', '2_of_hearts.png', '2_of_spades.png', '3_of_clubs.png', '3_of_diamonds.png', '3_of_hearts.png', '3_of_spades.png', '4_of_clubs.png', '4_of_diamonds.png', '4_of_hearts.png', '4_of_spades.png', '5_of_clubs.png', '5_of_diamonds.png', '5_of_hearts.png', '5_of_spades.png', '6_of_clubs.png', '6_of_diamonds.png', '6_of_hearts.png', '6_of_spades.png', '7_of_clubs.png', '7_of_diamonds.png', '7_of_hearts.png', '7_of_spades.png', '8_of_clubs.png', '8_of_diamonds.png', '8_of_hearts.png', '8_of_spades.png', '9_of_clubs.png', '9_of_diamonds.png', '9_of_hearts.png', '9_of_spades.png', 'ace_of_clubs.png', 'ace_of_diamonds.png', 'ace_of_hearts.png', 'ace_of_spades.png', 'black_joker.png', 'jack_of_clubs.png', 'jack_of_diamonds.png', 'jack_of_hearts.png', 'jack_of_spades.png', 'king_of_clubs.png', 'king_of_diamonds.png', 'king_of_hearts.png', 'king_of_spades.png', 'queen_of_clubs.png', 'queen_of_diamonds.png', 'queen_of_hearts.png', 'queen_of_spades.png', 'red_joker.png',]
  const noJokerDeck = namesOfAllCards.filter(name => !name.includes('joker'))
  //need to filter out the jokers of the playing card deck
  const [cardsInDeck, setCardsInDeck] = useState([...noJokerDeck])
  
  //the 7 card hands that each player has
  const [topPlayerHand, setTopPlayerHand] = useState([])
  const [bottomPlayerHand, setBottomPlayerHand] = useState([])


  const [chipCoords, setChipCoords] = useState([-1, -1])
  const [selected, setSelected] = useState('None')
  //use the chip coordinate are used to 

  const [playerColor, setPlayerColor] = useState('None')
  const [computerColor, setComputerColor] = useState('None')

  //mapping of colors colors to numbers
  const chipToNum = {
    'all': -1, //used for the corners. Players cannot place chips here, but do they count towards making a sequence.
    'open': 0, //open space for player to put a chip
    'red': 1, 
    'blue': 2,
    'green': 3,  
  }
  const [grid, setGrid] = useState(new Array(10).fill(0).map(() => new Array(10).fill(0)))
  grid[0][0] = -1
  grid[0][9] = -1
  grid[9][0] = -1
  grid[9][9] = -1 
  //the actual playing grid

  //draws x cards out of the deck for the player and takes care of replenishing the main playing deck
  const drawCards = (numCards) => {
    let returnVal = []
    for(let i = 0; i < numCards; i += 1){
      const copy = [...cardsInDeck]
      const cardIndex = Math.floor(Math.random() * (cardsInDeck.length + 1))
      returnVal.push(cardsInDeck[cardIndex])
      copy.splice(cardIndex)
      if(copy.length === 0){
        setCardsInDeck(noJokerDeck)
      } else{
        setCardsInDeck(copy)
      }
    }
    return returnVal
  }

  //Draws the initial player hands
  const[started, setStarted] = useState(false)
  useEffect(() => {
    if(!started){
      setTopPlayerHand(drawCards(7))
      setBottomPlayerHand(drawCards(7))
    }
    setStarted(true)
  }, [started])

  //handles the highlighting of cards on the board
  useEffect(() => {
    if(chipCoords[0] !== -1 && chipCoords[1] !== -1){
      const clickedBoardCard = document.querySelector(`#letter${chipCoords[0]}-${chipCoords[1]}`)
      clickedBoardCard.style.borderColor = 'blue'
    }
  }, [chipCoords])

  //handles the highlighting of cards in hand
  useEffect(() => {
    const playerCards = document.querySelector('.bottom').childNodes
    for(let i = 0; i < playerCards.length; i++){
      if(i === selected){
        playerCards[selected].firstChild.style.borderWidth = '3px';
      } else{
        playerCards[i].firstChild.style.borderWidth = '0px';
      }
    }
  }, [selected])

  useEffect(() => {
    if(playerColor !== 'None' && computerColor !== 'None'){
      console.log(playerColor, computerColor)
      
    }
  }, [playerColor, computerColor])


  //hardcoded the order of all the cards on the playing board by specifying their names
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
      <Popup setComputerColor={setComputerColor} setPlayerColor={setPlayerColor}/>
      <table className="App">
        {[...Array(10).keys()].map(row => <FlexRow chipCoords={chipCoords} setChipCoords={setChipCoords} row={row} names={nameRows[row]} grid={grid}/>)}
      </table>`
      <SequenceBoard chipToNum={chipToNum} setGrid={setGrid}/>
      <div id='pane'>
        <Player setSelected={setSelected} cards={topPlayerHand} setHand={setTopPlayerHand} color='red' orientation='top'/>
        <Player setSelected={setSelected} cards={bottomPlayerHand} setHand={setBottomPlayerHand} color='blue' orientation='bottom'/>
      </div>
    </main>
  );
}

export default App;
