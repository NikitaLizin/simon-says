

function GameButton ({type,click}) {

  const handleClick = (e) => {
    const buttonClicked = e.target.value; 
    click(buttonClicked);
  }

  return (
    <button className="game-button" onClick={handleClick} value={type} style={{backgroundColor:type}}> </button>
  )
}