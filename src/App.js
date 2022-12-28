import './App.css';
import { useEffect, useState } from 'react';
import FlexRow from './FlexRow';
import SequenceBoard from './SequenceBoard';
import Player from './Player'

function App() {
  let started = false
  const namesOfAllCards = ['10_of_clubs.png', '10_of_diamonds.png', '10_of_hearts.png', '10_of_spades.png', '2_of_clubs.png', '2_of_diamonds.png', '2_of_hearts.png', '2_of_spades.png', '3_of_clubs.png', '3_of_diamonds.png', '3_of_hearts.png', '3_of_spades.png', '4_of_clubs.png', '4_of_diamonds.png', '4_of_hearts.png', '4_of_spades.png', '5_of_clubs.png', '5_of_diamonds.png', '5_of_hearts.png', '5_of_spades.png', '6_of_clubs.png', '6_of_diamonds.png', '6_of_hearts.png', '6_of_spades.png', '7_of_clubs.png', '7_of_diamonds.png', '7_of_hearts.png', '7_of_spades.png', '8_of_clubs.png', '8_of_diamonds.png', '8_of_hearts.png', '8_of_spades.png', '9_of_clubs.png', '9_of_diamonds.png', '9_of_hearts.png', '9_of_spades.png', 'ace_of_clubs.png', 'ace_of_diamonds.png', 'ace_of_hearts.png', 'ace_of_spades.png', 'black_joker.png', 'jack_of_clubs.png', 'jack_of_diamonds.png', 'jack_of_hearts.png', 'jack_of_spades.png', 'king_of_clubs.png', 'king_of_diamonds.png', 'king_of_hearts.png', 'king_of_spades.png', 'queen_of_clubs.png', 'queen_of_diamonds.png', 'queen_of_hearts.png', 'queen_of_spades.png', 'red_joker.png', '10_of_clubs.png', '10_of_diamonds.png', '10_of_hearts.png', '10_of_spades.png', '2_of_clubs.png', '2_of_diamonds.png', '2_of_hearts.png', '2_of_spades.png', '3_of_clubs.png', '3_of_diamonds.png', '3_of_hearts.png', '3_of_spades.png', '4_of_clubs.png', '4_of_diamonds.png', '4_of_hearts.png', '4_of_spades.png', '5_of_clubs.png', '5_of_diamonds.png', '5_of_hearts.png', '5_of_spades.png', '6_of_clubs.png', '6_of_diamonds.png', '6_of_hearts.png', '6_of_spades.png', '7_of_clubs.png', '7_of_diamonds.png', '7_of_hearts.png', '7_of_spades.png', '8_of_clubs.png', '8_of_diamonds.png', '8_of_hearts.png', '8_of_spades.png', '9_of_clubs.png', '9_of_diamonds.png', '9_of_hearts.png', '9_of_spades.png', 'ace_of_clubs.png', 'ace_of_diamonds.png', 'ace_of_hearts.png', 'ace_of_spades.png', 'black_joker.png', 'jack_of_clubs.png', 'jack_of_diamonds.png', 'jack_of_hearts.png', 'jack_of_spades.png', 'king_of_clubs.png', 'king_of_diamonds.png', 'king_of_hearts.png', 'king_of_spades.png', 'queen_of_clubs.png', 'queen_of_diamonds.png', 'queen_of_hearts.png', 'queen_of_spades.png', 'red_joker.png',]
  const noJokerDeck = namesOfAllCards.filter(name => !name.includes('joker'))
  const [cardsInDeck, setCardsInDeck] = useState([...noJokerDeck])
  const [chipCoords, setChipCoords] = useState([-1, -1])
  const [topPlayerHand, setTopPlayerHand] = useState([])
  const [bottomPlayerHand, setBottomPlayerHand] = useState([])
  const [selected, setSelected] = useState('None')
  const [nextMove, setNextMove] = useState()
  //use the turn variable when playing cards


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
  // console.log(grid)


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

  useEffect(() => {
    //need a function to get single card
    if(!started){
      setTopPlayerHand(drawCards(7))
      setBottomPlayerHand(drawCards(7))
      // console.log(topPlayerHand, bottomPlayerHand)
    }
    started = true
  }, [])

  useEffect(() => {
    console.log(chipCoords)
    if(chipCoords[0] !== -1 && chipCoords[1] !== -1){
      console.log(`#letter${chipCoords[0]}-${chipCoords[1]}`)
      const clickedBoardCard = document.querySelector(`#letter${chipCoords[0]}-${chipCoords[1]}`)
      console.log(clickedBoardCard)
      console.log('width is ')
      console.log(clickedBoardCard.style.borderWidth)
      clickedBoardCard.style.borderColor = 'blue'
      // for(let i = 0; i < 10; i++){
      //   for(let j = 0; i < 10; j++){
      //     const item = document.querySelector(`#letter${chipCoords[i]}-${chipCoords[j]}`)
      //     // console.log(item)
      //     // if(i !== chipCoords[0] && j !== chipCoords[1]){
      //     //   item.style.borderWidth = 'green'
      //     // }
      //   }
      // }
    }
  }, [chipCoords])


  useEffect(() => {
    // coolFunc(this.state.first)
    const playerCards = document.querySelector('.bottom').childNodes
    let found = false
    for(let i = 0; i < playerCards.length; i++){
      const cardName = playerCards[i].firstChild.alt
      if(cardName === selected && !found){
        found = true
        console.log(cardName + ' selected')
        console.log(playerCards[i])
        playerCards[i].firstChild.style.borderWidth = '3px';
        console.log(playerCards[i].firstChild.style.borderWidth)
      } else{
        playerCards[i].firstChild.style.borderWidth = '0px';
      }
    }
  }, [selected])
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
      <div id='pane'>
        <Player selected={selected} setSelected={setSelected} cards={topPlayerHand} setHand={setTopPlayerHand} color='red' orientation='top'/>
        <Player selected={selected} setSelected={setSelected} cards={bottomPlayerHand} setHand={setBottomPlayerHand} color='blue' orientation='bottom'/>
      </div>
    </main>
  );
}

export default App;
