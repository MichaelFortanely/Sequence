import React from 'react'

const FlexItem = ({name, row, col, setChipCoords, grid}) => {
  return (
    <td>
      <img onClick={(e) => {console.log(e.target.alt)
      setChipCoords([row, col])
      console.log(row, col)
      // grid[row][col] 
      //seting the number is easy
      const element = document.getElementById(`${row}-${col}`)
      element.style.display = ''
      element.classList.remove('black')
      element.classList.add('green')
      console.log(element.style.display)
      }} src={'PNG-cards/' + name} alt={name}/>
    </td>
  )
}

export default FlexItem