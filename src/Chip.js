import React from 'react'

const Chip = ({num}) => {
 if(num === 0 || num === 9 || num === 90 || num === 99){
    return (
        <div className='chip-container'>
            <div className='black pokerchip' id={`${Math.floor(num/10)}-${num % 10}`}  style={ {position: 'relative',left: `${-60 + 61 * (num % 10)}px`, top: `${-980 + (810/9) * Math.floor(num/10)}px`}}></div>
   </div>
) 

 } else{

     return (
         <div className='chip-container'>
            <div className='black pokerchip' id={`${Math.floor(num/10)}-${num % 10}`} style={ {display: 'none', position: 'relative',left: `${-60 + 61 * (num % 10)}px`, top: `${-980 + (810/9) * Math.floor(num/10)}px`}}></div>
    </div>
) 
}
}

export default Chip