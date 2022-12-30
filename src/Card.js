import React from 'react'

const Card = ({cardName, index, setSelected}) => {
  return (
    <div><img className='card-in-hand' id={`card-${index}`} onClick={(e) => {
        setSelected(index)
    }} src={'PNG-cards/' + cardName} alt={cardName}/></div>
  )
}

export default Card