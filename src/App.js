import './App.css';
import { useEffect, useState } from 'react';
import FlexRow from './FlexRow';
import SequenceBoard from './SequenceBoard';
import Player from './Player'
import Popup from './Popup';
import History from './History';
import { ExamineWin } from './ExamineWin';
import RecycleButton from './RecycleButton';
//TODO -> the player needs their own discard button, need to check win conditions, and need to swap the way coordinates are printed
//and any other finishing touches

function App() {
  
  const namesOfAllCards = ['10_of_clubs.png', '10_of_diamonds.png', '10_of_hearts.png', '10_of_spades.png', '2_of_clubs.png', '2_of_diamonds.png', '2_of_hearts.png', '2_of_spades.png', '3_of_clubs.png', '3_of_diamonds.png', '3_of_hearts.png', '3_of_spades.png', '4_of_clubs.png', '4_of_diamonds.png', '4_of_hearts.png', '4_of_spades.png', '5_of_clubs.png', '5_of_diamonds.png', '5_of_hearts.png', '5_of_spades.png', '6_of_clubs.png', '6_of_diamonds.png', '6_of_hearts.png', '6_of_spades.png', '7_of_clubs.png', '7_of_diamonds.png', '7_of_hearts.png', '7_of_spades.png', '8_of_clubs.png', '8_of_diamonds.png', '8_of_hearts.png', '8_of_spades.png', '9_of_clubs.png', '9_of_diamonds.png', '9_of_hearts.png', '9_of_spades.png', 'ace_of_clubs.png', 'ace_of_diamonds.png', 'ace_of_hearts.png', 'ace_of_spades.png', 'black_joker.png', 'jack_of_clubs.png', 'jack_of_diamonds.png', 'jack_of_hearts.png', 'jack_of_spades.png', 'king_of_clubs.png', 'king_of_diamonds.png', 'king_of_hearts.png', 'king_of_spades.png', 'queen_of_clubs.png', 'queen_of_diamonds.png', 'queen_of_hearts.png', 'queen_of_spades.png', 'red_joker.png', '10_of_clubs.png', '10_of_diamonds.png', '10_of_hearts.png', '10_of_spades.png', '2_of_clubs.png', '2_of_diamonds.png', '2_of_hearts.png', '2_of_spades.png', '3_of_clubs.png', '3_of_diamonds.png', '3_of_hearts.png', '3_of_spades.png', '4_of_clubs.png', '4_of_diamonds.png', '4_of_hearts.png', '4_of_spades.png', '5_of_clubs.png', '5_of_diamonds.png', '5_of_hearts.png', '5_of_spades.png', '6_of_clubs.png', '6_of_diamonds.png', '6_of_hearts.png', '6_of_spades.png', '7_of_clubs.png', '7_of_diamonds.png', '7_of_hearts.png', '7_of_spades.png', '8_of_clubs.png', '8_of_diamonds.png', '8_of_hearts.png', '8_of_spades.png', '9_of_clubs.png', '9_of_diamonds.png', '9_of_hearts.png', '9_of_spades.png', 'ace_of_clubs.png', 'ace_of_diamonds.png', 'ace_of_hearts.png', 'ace_of_spades.png', 'black_joker.png', 'jack_of_clubs.png', 'jack_of_diamonds.png', 'jack_of_hearts.png', 'jack_of_spades.png', 'king_of_clubs.png', 'king_of_diamonds.png', 'king_of_hearts.png', 'king_of_spades.png', 'queen_of_clubs.png', 'queen_of_diamonds.png', 'queen_of_hearts.png', 'queen_of_spades.png', 'red_joker.png',]
  // for(let i = 0; i < namesOfAllCards.length/2; i += 1){
  //   namesOfAllCards[i] = 'jack_of_hearts.png'
  // }
  // for(let i = namesOfAllCards.length/2; i < namesOfAllCards.length; i += 1){
  //   namesOfAllCards[i] = 'jack_of_spades.png'
  // }
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
    //draw without replacement during each call
    if(numCards === 0 || cardsInDeck.length === 0){
      console.log('ERROR DRAWING CARDS! numcards '  + numCards + " cardsinDeck: ")
      console.log(cardsInDeck)
    }
    let returnVal = []
    let copy = [...cardsInDeck]
    let set = new Set([])
    for(let i = 0; i < numCards; i += 1){
      let cardIndex = Math.floor(Math.random() * (cardsInDeck.length))
      while(set.has(cardIndex)){
        cardIndex = Math.floor(Math.random() * (cardsInDeck.length))
        set.add(cardIndex)
      }
      console.log('random card index is ' + cardIndex)
      console.log('random card returned is ' + cardsInDeck[cardIndex])
      returnVal.push(cardsInDeck[cardIndex])
      copy.splice(cardIndex)
      if(copy.length === 0){
        copy = [...noJokerDeck]
        set = new Set([])
      }

      if(cardsInDeck[cardIndex] === undefined){
        console.log('UNDEFINED CARD AT INDEX ' + cardIndex + " PANIC")
        console.log(1/0)
      }
      
    }
    setCardsInDeck(copy)
    console.log('returning returnVal')
    console.log(returnVal)
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
        console.log('here')
        if(cardSelected.indexOf('jack') !== -1){
          if(cardSelected.indexOf('hearts') !== -1 || cardSelected.indexOf('diamonds') !== -1){
            //need to check that the selected card is computers card
            if(grid[chipCoords[0]][chipCoords[1]] !== chipToNum[computerColor.toLowerCase()]){
              return
            }
            playedRedJack = true
            console.log('set to true')
          } else{
            //just check that the space is open
            if(grid[chipCoords[0]][chipCoords[1]] !== chipToNum['open']){
              return
            }
          }
        }
        const element = document.getElementById(`${chipCoords[0]}-${chipCoords[1]}`)
        if(playedRedJack){
          console.log('heresss')
          grid[chipCoords[0]][chipCoords[1]] = 0
          element.style.display = 'none'
          element.classList.add('black')
          element.classList.remove(computerColor.toLowerCase())
          console.log(element.style.display)
        } else{
          grid[chipCoords[0]][chipCoords[1]] = chipToNum[playerColor.toLowerCase()]
          element.style.display = ''
          element.classList.remove('black')
          element.classList.add(playerColor.toLowerCase())
        }
        
        //now must update the card of the player
        const newCard = drawCards(1)[0]
        bottomPlayerHand[selected] = newCard
        // document.querySelector(`#card-${selected}`).alt = newCard


        let logStream = document.querySelector('.log-stream')
        let newPlayerMove = document.createElement('h4')
        if(playedRedJack){
          newPlayerMove.innerText = `You used a ${cardSelected.slice(0, cardSelected.indexOf('.')).split('_').join(' ')} to remove a chip at  (${chipCoords[1]}, ${chipCoords[0]}).`
        } else{
          newPlayerMove.innerText = `You placed a ${cardSelected.slice(0, cardSelected.indexOf('.')).split('_').join(' ')} at coordinates (${chipCoords[1]}, ${chipCoords[0]}).`
        }
        logStream.prepend(newPlayerMove)
        // console.log(chipToNum[playerColor.toLowerCase()], playerColor.toLowerCase())
        if(ExamineWin(chipToNum[playerColor.toLowerCase()], grid) === true){
          alert('You win!')
        }
        setTimeout(function() {
          //your code to be executed after 1 second
          computerTurn()
        }, 1000);
        
      }
    }
    //do not modify chip coords in here
  }, [chipCoords[0], chipCoords[1], selected])

  useEffect(() => {
    if(valid){
      document.querySelector('.popup-window').style.display = 'none'
      document.querySelector('.recycle').style.display = 'block'
      document.querySelector('body').style.background = 'green'
      document.querySelector('#pane').style.display = 'inline-block'
      document.querySelector('.history-log').style.display = 'inline-block'
    }
  }, [valid])


  //hardcoded the order of all the cards on the playing board by specifying their names



  function computerTurn(){
    //now make the computer take a turn
        //this triple for loop calculates all possible moves for the computer
        let logStream = document.querySelector('.log-stream')
        function getMoves(){
          let possibleMoves = []
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
          let redJackIndex = -1
          let blackJackIndex = -1
          console.log(topPlayerHand)
          for(let i = 0; i < topPlayerHand.length; i += 1){
            let possibleJack = topPlayerHand[i]
            if(possibleJack.indexOf('jack') !== -1){
              if(possibleJack.indexOf('hearts') !== -1 || possibleJack.indexOf('diamonds') !== -1){
                redJackIndex = i
              } else{
                blackJackIndex = i
              }
            }
          }
          let possibleRedMoves = []
          //find all possible red moves and all possible black moves
          if(redJackIndex !== -1){
            for(let i = 0; i < grid.length; i += 1){
              for(let j = 0; j < grid[0].length; j += 1){
                if(grid[i][j] === chipToNum[playerColor.toLowerCase()]){
                  possibleRedMoves.push(`${i}-${j}-${redJackIndex}`)
                }
              }
            }
            console.log('possible red moves')
            console.log(possibleRedMoves)
          }
          let possibleBlackMoves = []
          //find all possible red moves and all possible black moves
          if(blackJackIndex !== -1){
            for(let i = 0; i < grid.length; i += 1){
              for(let j = 0; j < grid[0].length; j += 1){
                if(grid[i][j] === chipToNum['open']){
                  possibleBlackMoves.push(`${i}-${j}-${blackJackIndex}`)
                }
              }
            }
            // console.log('possible black moves')
            // console.log(possibleBlackMoves)
          }

          possibleMoves = [...possibleMoves, ...possibleBlackMoves, ...possibleRedMoves]
          return possibleMoves
        }
        //WHY NO JACK MOVES BY
        let possibleMoves = getMoves()

        //get the chip at the position that the computer wants plays its random move at
        if(possibleMoves.length === 0){
          //refills computers hand when it has no moves
          console.log('no MOVES')
          console.log('returned is ')
          let returned = drawCards(7)
          for(let i = 0; i < 7; i += 1){
            topPlayerHand[i] = returned[i] 
          }
          possibleMoves = getMoves()
          console.log('reset computer hand')
          console.log(topPlayerHand)
        }
        console.log('possible moves')
        console.log(possibleMoves)
        const nextMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
        // console.log(nextMove)
        const computer_coords = document.getElementById(nextMove.slice(0, 3))
        // console.log(computer_coords)
        
        //update grid
        const compXCoord = parseInt(nextMove.slice(0, 1))
        const compYCoord = parseInt(nextMove.slice(2, 3))
        console.log(topPlayerHand)
        let nextCardToPlay = topPlayerHand[parseInt(nextMove.slice(4, 5))]
        let makingRedMove = false
        if(nextCardToPlay.indexOf('jack') !== -1){
          if(nextCardToPlay.indexOf('hearts') !== -1 || nextCardToPlay.indexOf('diamonds') !== -1){
            makingRedMove = true
            console.log('MAKING RED MOVE')
          }
        }

        if(makingRedMove){
          grid[compXCoord][compYCoord] = chipToNum['open']
          computer_coords.style.display = 'none'
          computer_coords.classList.add('black')
          computer_coords.classList.remove(chipToNum[playerColor.toLowerCase()])
          // const someCard = nameRows[compXCoord][compYCoord]
          let newComputerMove = document.createElement('h4')
          
          newComputerMove.innerText = `Computer used a ${nextCardToPlay.slice(0, nextCardToPlay.indexOf('.')).split('_').join(' ')} to remove your chip at coordinates (${compYCoord}, ${compXCoord}).`
          logStream.prepend(newComputerMove)
        } else{

          grid[compXCoord][compYCoord] = chipToNum[computerColor.toLowerCase()]
          // console.log(grid[parseInt(nextMove.slice(0, 1))])
          
          //change chip to computerColor
          computer_coords.style.display = ''
          computer_coords.classList.remove('black')
          computer_coords.classList.add(computerColor.toLowerCase())
          // const someCard = nameRows[compXCoord][compYCoord]
          let newComputerMove = document.createElement('h4')
          
          newComputerMove.innerText = `Computer placed a ${nextCardToPlay.slice(0, nextCardToPlay.indexOf('.')).split('_').join(' ')} at coordinates (${compYCoord}, ${compXCoord}).`
          logStream.prepend(newComputerMove)
        }
        while(logStream.childNodes.length > 15){
          logStream.removeChild(logStream.lastChild)
        }
        topPlayerHand[parseInt(nextMove.slice(4, 5))] = drawCards(1)[0]
        if(ExamineWin(chipToNum[computerColor.toLowerCase()], grid) === true){
          alert('You Lost!')
        }
  }

  return (
    <main>
      <History playerColor={playerColor} computerColor={computerColor}/>
      <RecycleButton computerTurn={computerTurn} setBottomPlayerHand={setBottomPlayerHand} bottomPlayerHand={bottomPlayerHand} drawCards={drawCards} selected={selected}/>
      <Popup setValid={setValid} setComputerColor={setComputerColor} setPlayerColor={setPlayerColor}/>
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
