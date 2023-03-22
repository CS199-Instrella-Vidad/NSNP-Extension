import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Simulation from "./components/Prototype/Simulation";
import ConfigHist from "./components/Prototype/ConfigHist/ConfigHist";
import Header from "./components/Prototype/Header/Header";
import Graph from "./components/Prototype/Graph/Graph";
import NSNP from "./pages/NSNP/NSNP";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="App">
        {/* <Header /> */}
        {/* <ConfigHist /> */}
        {/* <NSNP /> */}
        <Simulation />
        {/* <Graph /> */}
      </div>
    </>
  );
}

export default App;
