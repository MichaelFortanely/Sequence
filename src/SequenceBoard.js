import React from 'react'
import Chip from './Chip'

const SequenceBoard = ({chipToNum, grid, setGrid}) => {
    
    return (
        <div className='board'>
    {[...Array(100).keys()].map(num => <Chip num={num} chipToNum={chipToNum} setGrid={setGrid} grid={grid} />)}
    </div>
  )
}

export default SequenceBoard