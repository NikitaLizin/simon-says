
const delay =  ms => (
  new Promise (resolve => setTimeout(resolve,ms))
); 

const getStartingSequence =  (arr) => {
  const sequence = []; 

  while (sequence.length < 3) {
    const randomNr = Math.floor(Math.random() * arr.length); 
    sequence.push(arr[randomNr])
  }

  return sequence; 
}

async function sequenceAnimation (seq) {
  for (let i = 0; i <=  seq.length-1; i++){
    document.body.style.backgroundColor = seq[i]; 
    await delay(1000);

    document.body.style.backgroundColor = "white";
    // remove delay for the last sequence value. 
    if (i !=  seq.length-1) await delay(1000);
    
  }   
}

const incorrect = async () => {
  document.body.style.backgroundColor = "#AD343E"; 
  await delay(500); 
  document.body.style.backgroundColor = "white"; 
}

async function correct (color)  { 
  document.body.style.backgroundColor = `${color}`; 
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
  const [status,setStatus] = React.useState("countdown");// countdown deafult  
  const headerContent = setHeaderContent(status,level); 
  let btnClicked = null; 
  
  
  React.useEffect(() => {
    if (status !=  "sequence") return; 

    const showSequence = async () => {
      await delay(1000); 
      await sequenceAnimation(sequence);
      setStatus("start");
    }
    
    showSequence();

  },[status]);

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
    
    if (!btnClicked){
      await incorrect(); 
      setStatus("gameOver");
    } 
     
  }

  const handleClick = async (btnPressed) => {

    // make buttons active when game starts.
    if (status != "start") return;
     
    if (btnClicked) return; // can only click button when animation finishes.

    btnClicked = true; // controlls so you cant press the button before all animations and states are changed. 

    const lastIndex = pressed.length; 
    const seqCompare = sequence[lastIndex]; 

    if (seqCompare === btnPressed) {
      await correct(btnPressed); 
      setPressed((prev => [...prev,btnPressed]));
    } else {
      await incorrect(); 
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
       
      {status === "start" && <Timer onTimeExpired={onTimeExpired}   />}
       

      { status === "gameOver" &&
        <GameOver playAgain = {playAgain} sequence={sequence} pressed = {pressed} /> 
      }
      
      
      { status === "countdown" &&
        <Countdown handleCountDown = {handleCountdown} />
      }    

      
   
      
      <div className="game-container">

         

        { // create buttons for the game. 
          

          buttons.map((val) => (
            <div className="game-button-container" key={`game-button-container${val}`} >
              <GameButton click = {handleClick} type={val} key ={`gameButton${val}`} /> 
            </div>
          ))

        }


      </div>
    </> 
  )
  
}
