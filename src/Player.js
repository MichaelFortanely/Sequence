import React from 'react'
import Card from './Card'

const Player = ({cards, setHand, orientation}) => {
    if(orientation === 'top'){
  return (
    <div className='playerHand top'>
        {cards.map(function(card){
                return <Card cardName={card}/>
                })}
    </div>
  )
}
else{
    return (
        <div className='playerHand bottom'>
            {cards.map(function(card){
                    return <Card cardName={card}/>
                    })}
        </div>
      )
    }
}


export default Player