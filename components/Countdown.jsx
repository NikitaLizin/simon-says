const delay =  ms => (
  new Promise (resolve => setTimeout(resolve,ms))
); 

function Countdown ({handleCountDown}) {

  const [count, setCount] = React.useState(3);
  

  React.useEffect(() => {
    // Set up the interval
    
    const intervalId = setInterval(() => {
      setCount((prev => prev - 1)); // Use functional update for correct state
    }, 1000);

      
     
    if (count === 1){
      clearInterval(intervalId);
      handleCountDown();
    }
    
    // Cleanup function to clear the interval
    return () => {
      clearInterval(intervalId);
    };
  },[count]); 

  return(
    <div className="countdown-container">
      <h2 className="countdown-text"> Prepare yourself </h2>
      <div className="number-container">
        <h3 className="countdown-h3"> {count} </h3>
      </div>
    </div>
  ) 
}