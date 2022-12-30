import React from 'react'

const History = ({playerColor, computerColor}) => {
  return (
    <div className='history-log'>
        <div className='log-stream'>
            <h4>You have {playerColor} chips and the computer has {computerColor} chips.</h4>
        </div>
    </div>
  )
}

export default History