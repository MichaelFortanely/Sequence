import React from 'react'

const Card = ({cardName, selected, setSelected}) => {
  return (
    <div><img className='card-in-hand' onClick={(e) => {
        setSelected(e.target.alt)
    }} src={'PNG-cards/' + cardName} alt={cardName}/></div>
  )
}

export default Card