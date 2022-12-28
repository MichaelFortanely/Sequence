import React from 'react'

const Chip = ({num, chipToNum,setGrid, grid}) => {
 if(num === 0 || num === 9 || num === 90 || num === 99){
    return (
        <div className='chip-container'>
            <div className='black pokerchip' id={`${Math.floor(num/10)}-${num % 10}`}  style={ {position: 'relative',left: `${-60 + 63 * (num % 10)}px`, top: `${-1000 + (840/9) * Math.floor(num/10)}px`}}></div>
   </div>
) 

 } else{

     return (
         <div className='chip-container'>
            <div className='black pokerchip' id={`${Math.floor(num/10)}-${num % 10}`} style={ {display: 'none', position: 'relative',left: `${-60 + 63 * (num % 10)}px`, top: `${-1000 + (840/9) * Math.floor(num/10)}px`}}></div>
    </div>
) 
}
}

export default Chip