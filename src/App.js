import './App.css';
import { useEffect, useState } from 'react';
import FlexRow from './FlexRow';
import SequenceBoard from './SequenceBoard';
import Player from './Player'
import Popup from './Popup';
import History from './History';
import { ExamineWin } from './ExamineWin';

function App() {
  
  const namesOfAllCards = ['10_of_clubs.png', '10_of_diamonds.png', '10_of_hearts.png', '10_of_spades.png', '2_of_clubs.png', '2_of_diamonds.png', '2_of_hearts.png', '2_of_spades.png', '3_of_clubs.png', '3_of_diamonds.png', '3_of_hearts.png', '3_of_spades.png', '4_of_clubs.png', '4_of_diamonds.png', '4_of_hearts.png', '4_of_spades.png', '5_of_clubs.png', '5_of_diamonds.png', '5_of_hearts.png', '5_of_spades.png', '6_of_clubs.png', '6_of_diamonds.png', '6_of_hearts.png', '6_of_spades.png', '7_of_clubs.png', '7_of_diamonds.png', '7_of_hearts.png', '7_of_spades.png', '8_of_clubs.png', '8_of_diamonds.png', '8_of_hearts.png', '8_of_spades.png', '9_of_clubs.png', '9_of_diamonds.png', '9_of_hearts.png', '9_of_spades.png', 'ace_of_clubs.png', 'ace_of_diamonds.png', 'ace_of_hearts.png', 'ace_of_spades.png', 'black_joker.png', 'jack_of_clubs.png', 'jack_of_diamonds.png', 'jack_of_hearts.png', 'jack_of_spades.png', 'king_of_clubs.png', 'king_of_diamonds.png', 'king_of_hearts.png', 'king_of_spades.png', 'queen_of_clubs.png', 'queen_of_diamonds.png', 'queen_of_hearts.png', 'queen_of_spades.png', 'red_joker.png', '10_of_clubs.png', '10_of_diamonds.png', '10_of_hearts.png', '10_of_spades.png', '2_of_clubs.png', '2_of_diamonds.png', '2_of_hearts.png', '2_of_spades.png', '3_of_clubs.png', '3_of_diamonds.png', '3_of_hearts.png', '3_of_spades.png', '4_of_clubs.png', '4_of_diamonds.png', '4_of_hearts.png', '4_of_spades.png', '5_of_clubs.png', '5_of_diamonds.png', '5_of_hearts.png', '5_of_spades.png', '6_of_clubs.png', '6_of_diamonds.png', '6_of_hearts.png', '6_of_spades.png', '7_of_clubs.png', '7_of_diamonds.png', '7_of_hearts.png', '7_of_spades.png', '8_of_clubs.png', '8_of_diamonds.png', '8_of_hearts.png', '8_of_spades.png', '9_of_clubs.png', '9_of_diamonds.png', '9_of_hearts.png', '9_of_spades.png', 'ace_of_clubs.png', 'ace_of_diamonds.png', 'ace_of_hearts.png', 'ace_of_spades.png', 'black_joker.png', 'jack_of_clubs.png', 'jack_of_diamonds.png', 'jack_of_hearts.png', 'jack_of_spades.png', 'king_of_clubs.png', 'king_of_diamonds.png', 'king_of_hearts.png', 'king_of_spades.png', 'queen_of_clubs.png', 'queen_of_diamonds.png', 'queen_of_hearts.png', 'queen_of_spades.png', 'red_joker.png',]
  // for(let i = 0; i < namesOfAllCards.length/2; i += 1){
  //     namesOfAllCards[i] = 'jack_of_diamonds.png'
  //   }
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
  const[valid, setValid] = useState(false)

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

  const nameRows = [
    ['red_joker.png', '4_of_spades.png', '3_of_spades.png', '2_of_spades.png', 'ace_of_spades.png', 'ace_of_clubs.png', '2_of_clubs.png', '3_of_clubs.png', '4_of_clubs.png', 'black_joker.png'],
    ['4_of_diamonds.png', 'king_of_spades.png', '5_of_spades.png', '6_of_spades.png', '7_of_spades.png', '7_of_clubs.png', '6_of_clubs.png', '5_of_clubs.png', 'king_of_clubs.png', '4_of_hearts.png'],
    ['3_of_diamonds.png', '5_of_diamonds.png', 'queen_of_spades.png', '9_of_spades.png', '8_of_spades.png', '8_of_clubs.png', '9_of_clubs.png', 'queen_of_clubs.png', '5_of_hearts.png', '3_of_hearts.png'],
    ['2_of_diamonds.png', '6_of_diamonds.png', '9_of_diamonds.png', 'queen_of_diamonds.png', '10_of_spades.png', '10_of_clubs.png', 'queen_of_hearts.png', '9_of_hearts.png', '6_of_hearts.png', '2_of_hearts.png'],
    ['ace_of_diamonds.png', '7_of_diamonds.png', '8_of_diamonds.png', '10_of_diamonds.png', 'king_of_diamonds.png', 'king_of_hearts.png', '10_of_hearts.png', '8_of_hearts.png', '7_of_hearts.png', 'ace_of_hearts.png'],
    ['ace_of_hearts.png', '7_of_hearts.png', '8_of_hearts.png', '10_of_hearts.png', 'king_of_hearts.png', 'king_of_diamonds.png', '10_of_diamonds.png', '8_of_diamonds.png', '7_of_diamonds.png', 'ace_of_diamonds.png'],
    ['2_of_hearts.png', '6_of_hearts.png', '9_of_hearts.png', 'queen_of_hearts.png', '10_of_clubs.png', '10_of_spades.png', 'queen_of_diamonds.png', '9_of_diamonds.png', '6_of_diamonds.png', '2_of_diamonds.png'],
    ['3_of_hearts.png', '5_of_hearts.png', 'queen_of_clubs.png', '9_of_clubs.png', '8_of_clubs.png', '8_of_spades.png', '9_of_spades.png', 'queen_of_spades.png', '5_of_diamonds.png', '3_of_diamonds.png'],
    ['4_of_hearts.png', 'king_of_clubs.png', '5_of_clubs.png', '6_of_clubs.png', '7_of_clubs.png', '7_of_spades.png', '6_of_spades.png', '5_of_spades.png', 'king_of_spades.png', '4_of_diamonds.png'],
    ['black_joker.png', '4_of_clubs.png', '3_of_clubs.png', '2_of_clubs.png', 'ace_of_clubs.png', 'ace_of_spades.png', '2_of_spades.png', '3_of_spades.png', '4_of_spades.png', 'red_joker.png'],
  ]

  //draws x cards out of the deck for the player and takes care of replenishing the main playing deck
  const drawCards = (numCards) => {
    let returnVal = []
    for(let i = 0; i < numCards; i += 1){
      const copy = [...cardsInDeck]
      const cardIndex = Math.floor(Math.random() * (cardsInDeck.length + 1))
      returnVal.push(cardsInDeck[cardIndex])
      if(cardsInDeck[cardIndex] === undefined){
        console.log('UNDEFINED CARD AT INDEX ' + cardIndex)
        i -= 1
        returnVal.splice(returnVal.length - 1)
        continue
      }
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
    if(chipCoords[0] !== -1 && selected !== 'None'){
      const cardSelected = bottomPlayerHand[selected]
      const cardInGrid = nameRows[chipCoords[0]][chipCoords[1]]
      console.log(cardSelected)
      if(cardSelected === cardInGrid || cardSelected.indexOf('jack') !== -1){
        //this sets the color of player choice
        // console.log(grid[chipCoords[0][chipCoords[1]]] === chipToNum[playerColor])
        let playedRedJack = false
        if(cardSelected.indexOf('jack') !== -1){
          if(cardSelected.indexOf('hearts') !== -1 || cardSelected.indexOf('diamonds') !== -1){
            //need to check that the selected card is computers card
            console.log(grid[chipCoords[0]][chipCoords[1]], chipToNum[computerColor.toLowerCase()])
            console.log('RED JACK')
            if(grid[chipCoords[0]][chipCoords[1]] !== chipToNum[computerColor.toLowerCase()]){
              return
            }
            playedRedJack = true
          } else{
            //just check that the space is open
            console.log('hereeeee')
            console.log(grid[chipCoords[0][chipCoords[1]]], chipToNum['open'])
            if(grid[chipCoords[0]][chipCoords[1]] !== chipToNum['open']){
              return
            }
          }
        }
        console.log('heres')
        if(playedRedJack){
          grid[chipCoords[0]][chipCoords[1]] = 0
          const element = document.getElementById(`${chipCoords[0]}-${chipCoords[1]}`)
          element.style.display = 'none'
          element.classList.add('black')
          element.classList.remove(computerColor.toLowerCase())
        }

        grid[chipCoords[0]][chipCoords[1]] = chipToNum[playerColor.toLowerCase()]
        const element = document.getElementById(`${chipCoords[0]}-${chipCoords[1]}`)
        element.style.display = ''
        element.classList.remove('black')
        element.classList.add(playerColor.toLowerCase())
        
        //now must update the card of the player
        const newCard = drawCards(1)[0]
        bottomPlayerHand[selected] = newCard
        // document.querySelector(`#card-${selected}`).alt = newCard


        let logStream = document.querySelector('.log-stream')
        let newPlayerMove = document.createElement('h4')
        if(playedRedJack){
          newPlayerMove.innerText = `You used a ${cardSelected.slice(0, cardSelected.indexOf('.')).split('_').join(' ')} to remove a chip at  (${chipCoords[0]}, ${chipCoords[1]}).`
        } else{
          newPlayerMove.innerText = `You placed a ${cardSelected.slice(0, cardSelected.indexOf('.')).split('_').join(' ')} at coordinates (${chipCoords[0]}, ${chipCoords[1]}).`
        }
        logStream.prepend(newPlayerMove)
        // console.log(chipToNum[playerColor.toLowerCase()], playerColor.toLowerCase())
        if(ExamineWin(chipToNum[playerColor.toLowerCase()], grid) === true){
          alert('You win!')
        }
        
        //now make the computer take a turn
        //this triple for loop calculates all possible moves for the computer
        const possibleMoves = []
        for(let i = 0; i < 10; i += 1){
          for(let j = 0; j < 10; j += 1){
            if(grid[i][j] === 0){//if the space is open
              for(let k = 0; k < 7; k += 1){
                if(nameRows[i][j] === topPlayerHand[k]){
                  // console.log(topPlayerHand[k])
                  // console.log(i, j, k)
                  possibleMoves.push(`${i}-${j}-${k}`)
              }
              }
            }
          }
        }

        //get the chip at the position that the computer wants plays its random move at
        if(possibleMoves.length === 0){
          alert('Computer out of possible Moves!!')
        }
        console.log(possibleMoves)
        const nextMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
        console.log(nextMove)
        const computer_coords = document.getElementById(nextMove.slice(0, 3))
        console.log(computer_coords)
        
        //update grid
        const compXCoord = parseInt(nextMove.slice(0, 1))
        const compYCoord = parseInt(nextMove.slice(2, 3))
        grid[compXCoord][compYCoord] = chipToNum[computerColor.toLowerCase()]
        // console.log(grid[parseInt(nextMove.slice(0, 1))])

        //change chip to computerColor
        computer_coords.style.display = ''
        computer_coords.classList.remove('black')
        computer_coords.classList.add(computerColor.toLowerCase())
        const someCard = nameRows[compXCoord][compYCoord]
        let newComputerMove = document.createElement('h4')

        newComputerMove.innerText = `Computer placed a ${someCard.slice(0, someCard.indexOf('.')).split('_').join(' ')} at coordinates (${compXCoord}, ${compYCoord}).`
        logStream.prepend(newComputerMove)
        while(logStream.childNodes.length > 15){
          logStream.removeChild(logStream.lastChild)
        }
        topPlayerHand[parseInt(nextMove.slice(4, 5))] = drawCards(1)[0]
        if(ExamineWin(chipToNum[computerColor.toLowerCase()], grid) === true){
          alert('You Lost!')
        }
        
      }
    }
    //do not modify chip coords in here
  }, [chipCoords[0], chipCoords[1], selected])

  useEffect(() => {
    if(valid){
      document.querySelector('form').style.display = 'none'
      document.querySelector('body').style.background = 'green'
      document.querySelector('#pane').style.display = 'inline-block'
      document.querySelector('.history-log').style.display = 'inline-block'
    }
  }, [valid])


  //hardcoded the order of all the cards on the playing board by specifying their names
  

  return (
    <main>
      <History playerColor={playerColor} computerColor={computerColor}/>
      <Popup setValid={setValid} setComputerColor={setComputerColor} setPlayerColor={setPlayerColor}/>
      <table className="App">
        {[...Array(10).keys()].map(row => <FlexRow playerColor={playerColor} chipCoords={chipCoords} setChipCoords={setChipCoords} row={row} names={nameRows[row]} grid={grid}/>)}
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
