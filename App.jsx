const app = document.getElementById("root");
const root = ReactDOM.createRoot(app); 

function Main () {
 return (
  <div className="main">
    <Game/>
  </div>
 )
}

root.render(<Main/>); 

