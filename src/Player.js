import React from 'react'
import Card from './Card'

const Player = ({cards, setHand, orientation, selected, setSelected}) => {
    if(orientation === 'top'){
  return (
    <div className='playerHand top'>
        {cards.map(function(card){
                return <Card selected={selected} setSelected={setSelected} cardName={card}/>
                })}
    </div>
  )
}
else{
    return (
        <div className='playerHand bottom'>
            {cards.map(function(card){
                    return  <Card selected={selected} setSelected={setSelected} cardName={card}/>
                    })}
        </div>
      )
    }
}


export default Player