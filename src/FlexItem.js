import React from 'react'

//to make this project look like really professional I could make the use of react router and context

const FlexItem = ({name, row, col, setChipCoords, chipCoords}) => {
  return (
    <td className='board-card' id={`letter${row}-${col}`}>
      <img   onClick={(e) => {
        // console.log(e.target.alt)
      if(chipCoords[0] !== -1){

        const prevHighlightedElement = document.querySelector(`#letter${chipCoords[0]}-${chipCoords[1]}`)
        prevHighlightedElement.style.borderColor = 'green'
      }
      setChipCoords([row, col])
      // console.log(row, col)
      // grid[row][col] 
      //seting the number is easy
      const element = document.getElementById(`${row}-${col}`)
      element.style.display = ''
      element.classList.remove('black')
      element.classList.add('green')
      // console.log(element.style.display)
      }} src={'PNG-cards/' + name} alt={name}/>
    </td>
  )
}

export default FlexItem