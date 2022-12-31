import React from 'react'
import FlexItem from './FlexItem'
const FlexRow = ({names, row, setChipCoords, chipCoords}) => {
  let x = -1
  return (
    <div>
        <tr>
            {names.map(function(name){
              x += 1;
               return <FlexItem chipCoords={chipCoords} row={row} setChipCoords={setChipCoords} col={x} name={name}/>
            })}
        </tr>
    </div>
  )
}

export default FlexRow