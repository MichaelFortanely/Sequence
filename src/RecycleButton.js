import React from 'react'

const RecycleButton = ({setBottomPlayerHand, bottomPlayerHand, drawCards, selected, computerTurn}) => {
    function func(){
        if(selected !== 'None'){
            computerTurn()
            let rubbish = [...bottomPlayerHand]
            console.log(rubbish)
            let newCard = drawCards(1)[0]
            rubbish[selected] = newCard
            console.log(' transforamtion')
            console.log(rubbish)
            setBottomPlayerHand(rubbish)
        }
    }
  return (
    <div className='recycle'>
        <div>
                <button onClick={(e) => {e.preventDefault()
                func()}}>Replace Card</button>
        </div>
    </div>
  )
}

export default RecycleButton