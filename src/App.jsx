import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NSNP from "./pages/NSNP/NSNP";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="App">
        {/* <Header /> */}
        {/* <ConfigHist /> */}
        <NSNP />
        {/* <Simulation /> */}
        {/* <Graph /> */}
      </div>
    </>
  );
}

export default App;
