
const delay =  ms => (
  new Promise (resolve => setTimeout(resolve,ms))
); 

const gameSettings = {
  timer:false, 
  fasterSequence:true, 
}

const getStartingSequence =  (arr) => {
  const sequence = []; 

  while (sequence.length < 3) {
    const randomNr = Math.floor(Math.random() * arr.length); 
    sequence.push(arr[randomNr])
  }

  return sequence; 
}



const incorrect = async () => {
  document.body.style.backgroundColor = "#AD343E"; 
  await delay(500); 
  document.body.style.backgroundColor = "white"; 
}


function expandSequence (options) {
  const length = options.length; 
  const randomNr = Math.floor(Math.random() * length);
  return options[randomNr];
}

function setHeaderContent(status,level) {
  if (status === "sequence") return "Memorize The sequence"; 
  else if (status === "start") return `Level ${level}`; 
  else return null; 
}


function Game () {

  const [level,setLevel] = React.useState(1); 
  const [pressed,setPressed] = React.useState([]); 
  const [buttons,setButtons] = React.useState([
    "#A9E5BB",
    "#FCF6B1",
    "#C8ADC0",
    "#3D5A80",
  ]); 
  const [sequence, setSequence] = React.useState(getStartingSequence(buttons));
  const [activeBtn,setActiveBtn] = React.useState(null); 
  const [status,setStatus] = React.useState("countdown");// countdown deafult  
  const headerContent = setHeaderContent(status,level); 
  const sequenceTimer = gameSettings.fasterSequence ? 300 : 600; 


  React.useEffect (() => {

    if (status != "sequence") return; 
    

    const sequenceAnimation = async () => {
      await delay(500); 
      for (let i = 0; i < sequence.length; i++){
        
        setActiveBtn(sequence[i]); 
        await delay(sequenceTimer); 

        setActiveBtn(null); 
        await delay(250); 
        
      }

      setStatus("start"); 

    }

    sequenceAnimation();
    
  },[status])

  
  

  if (pressed.length === sequence.length) {
    const newColor = expandSequence(buttons);
    setSequence((prev => [...prev,newColor]));
    setPressed([]); 
    setStatus("countdown");
    setLevel((prev => prev+1));
  }

  const playAgain = () => {
    setSequence(getStartingSequence(buttons)); 
    setStatus("countdown");
    setPressed([]);
    setLevel(1);
    btnClicked.current = null; 
  } 

  const onTimeExpired = async () => {
    
    if (!activeBtn){
      await incorrect(); 
      setStatus("gameOver");
    } 
     
  }

  const handleClick = async (btnPressed) => {

    // make buttons active when game starts.
    if (status != "start") return;
     
    if (activeBtn) return; // can only click button when animation finishes.

    const lastIndex = pressed.length; 
    const seqCompare = sequence[lastIndex]; 

    if (seqCompare === btnPressed) {
      setActiveBtn(btnPressed); 
      await delay(200); 
      setActiveBtn(null);  
      setPressed((prev => [...prev,btnPressed]));
      
    } else { 
      setStatus("gameOver");
    }

  }

  const handleCountdown = async() => {
    await delay(1000); 
    setStatus("sequence");
  }


  
  

  return (
    <>

      { headerContent && <Header content = {headerContent}/> } 
       
      {status === "start" && gameSettings.timer &&  <Timer onTimeExpired={onTimeExpired} activeBtn = {activeBtn} /> }
       

      { status === "gameOver" &&
        <GameOver playAgain = {playAgain} sequence={sequence} pressed = {pressed} /> 
      }
      
      { status === "countdown" &&
        <Countdown handleCountDown = {handleCountdown} />
      }    

      
      
      <div className="game-container">

        { // create buttons for the game. 
          
          buttons.map((val) => {
            
            return (
              <GameButton 
                type={val} 
                active = {activeBtn === val} 
                key ={`gameButton${val}`} 
                click = {handleClick}
              /> 
            ) 
               
          })

        }

      </div>
    </> 
  )
  
}
