

function ColorCircle ({color,size,pressed,nextSymbol}){

  const [src,setSrc] = React.useState(null);

  React.useEffect(() => {
    if (!pressed) return; 
    else if (pressed === color) setSrc("../assets/correct.svg"); 
    else setSrc("../assets/false.svg")

  },[pressed]);


  function handleAnimationEnd () {
    nextSymbol()
  } 

  function handleLoad(e){
    e.target.scrollIntoView({
      behavior:"smooth",
      inline:"center"
    });
  }

  return (

    <div className="color-circle" style={{backgroundColor:color,height:`calc(100% / ${size})`}}> 
      
      { src && <img className="symbol" src={src} onAnimationEnd={handleAnimationEnd} onLoad={handleLoad} />  }  
      
    </div>

  )

}


function GameOver () {

  const sequence = ["#C8ADC0", "#FCF6B1","#A9E5BB", "#3D5A80", "#A9E5BB","#3D5A80"]; 
  const [display,setDisplay] = React.useState(["#C8ADC0",]);
  const pressed = ["#C8ADC0", "#FCF6B1","#A9E5BB", "#3D5A80","#C8ADC0"];  

  const getSymbol = () => {
    const pressedColor = pressed[display.length] ? pressed[display.length] : "Not pressed"; 
    if (display.length < sequence.length) setDisplay((prev => [...prev,pressedColor]))
  }


  return (
    <div className="gameover-container">
      <Header content = {"Game Over!"} /> 

      <div className="sequence-container">
       {

        sequence.map((type,index) => { 
          
          return (
            <ColorCircle 
              key={`symbol${type}${index}`}
              color={type}
              pressed = {display[index]}
              size={sequence.length}
              nextSymbol={getSymbol}
            />
          )

        })

       }
      </div>

      <div className="gameover-btn-container">
        
        <button className="playAgain-btn gameover-btn"> 
          <span class="material-icons-round">replay</span>
          Play Again! 
        </button>

        <button className="continue-btn gameover-btn">
          Continue!
          <span class="material-icons-round">arrow_forward</span>
        </button>

      </div>
    </div>
  )
}