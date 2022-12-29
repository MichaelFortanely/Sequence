import React from 'react'

const Popup = ({setComputerColor, setPlayerColor}) => {
  return (
   
<form className='popup-window'>
    <div className='radio-buttons'>
        <h4>Your Color</h4>
        <br></br>
        <input type="radio" id="Red" name="player_color" value="Red"/>
        <label for="Red">  Red</label><br></br>
        <input type="radio" id="Green" name="player_color" value="Green"/>
        <label for="Green">  Green</label><br></br>
        <input type="radio" id="Blue" name="player_color" value="Blue"/>
        <label for="Blue">  Blue</label>
    </div>
    <div className='radio-buttons'>
        <h4>Computer's Color</h4>
        <br></br>
        <input type="radio" id="Red-1" name="computer_color" value="Red-1"/>
        <label for="Red-1">  Red</label><br></br>
        <input type="radio" id="Green-1" name="computer_color" value="Green-1"/>
        <label for="Green-1">  Green</label><br></br>
        <input type="radio" id="Blue-1" name="computer_color" value="Blue-1"/>
        <label for="Blue-1">  Blue</label>
    </div>
    <input className='submit' type="submit" value="Submit" onClick={(e) => {e.preventDefault();console.log(e)
    const nodes = document.querySelectorAll('input')
    const radioButtons = [...nodes].slice(0, 6)
    const checkedButtons = radioButtons.filter(button => button.checked)
    console.log(checkedButtons)
    if((radioButtons[0].checked && radioButtons[3].checked) || (radioButtons[1].checked && radioButtons[4].checked) || (radioButtons[2].checked && radioButtons[5].checked)){
      alert("You can't use the same color for yourself and the computer")
    }else if(checkedButtons.length !== 2){
      alert('You must pick a color for the computer and yourself')
    } else{
      setPlayerColor(checkedButtons[0].value)
      setComputerColor(checkedButtons[1].value.slice(0, checkedButtons[1].value.length - 2))
    }
    // const radioButtons = [nodes[0], nodes[1]]
    // console.log(radioButtons)
    }}/>
</form>
  )
}

export default Popup