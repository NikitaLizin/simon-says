

function GameButton ({type,click,active}) {  

  


  const handleClick = (e) => {
    const buttonClicked = e.target.value; 
    click(buttonClicked);
  }

  return (
    <button  
      className= { 
        `game-button
        ${active ? "active": ""}`
      }  
      onClick={ click && handleClick} 
      value={type} 
      style={{backgroundColor:type}}> 
    </button>
  )
}