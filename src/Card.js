import React from 'react'

const Card = ({cardName}) => {
  return (
    <div><img onClick={(e) => {console.log(e.target)
    }} src={'PNG-cards/' + cardName} alt={cardName}/></div>
  )
}

export default Card