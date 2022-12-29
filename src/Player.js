import React from 'react'
import Card from './Card'

const Player = ({cards, orientation, setSelected}) => {
    if(orientation === 'top'){
  return (
    <div className='playerHand top'>
        {cards.map(function(card){
                return <Card setSelected={setSelected} cardName={card}/>
                })}
    </div>
  )
}
else{
    let x = -1
    return (
        <div className='playerHand bottom'>
            {cards.map(function(card){
                    x += 1
                    return  <Card index={x} setSelected={setSelected} cardName={card}/>
                    })}
        </div>
      )
    }
}


export default Player