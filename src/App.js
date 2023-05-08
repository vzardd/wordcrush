import Navbar from "./Navbar";
import Playground from "./Playground";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Playground rand={Math.floor(Math.random() * (220))}/>
    </div>
  );
}

export default App;
