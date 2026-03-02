
function Timer ({onTimeExpired}) {
  const ref = React.useRef(null);  
  React.useEffect(() => {
    if (!ref.current) return; 
    const element = ref.current;
    
    const animationSettings = [
      {scale:"1 1"}, 
      {scale:"0 1"}, 
    ]; 

    const timing = {
      duration:3000,  
      iteration:1, 
      easing: "linear", 
      fill:"forwards", 
    }

    const animation = element.animate(animationSettings,timing); 
    
    animation.onfinish = () => {
      onTimeExpired();  
    }

    return () => animation.cancel(); 

  },);


  return(
    <div className="game-timer-container"> 
      <div className="game-timer" ref={ref}> </div>
    </div>
  ) 
}