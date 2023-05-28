import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NSNP from "./pages/NSNP/NSNP";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  const [count, setCount] = useState(0);
  function resetLocalStorage() {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <>
      <div className="App">
        <ErrorBoundary
          fallback={
            <div>
              Something went wrong. Click this button to clear cache.
              <br />
              <button onClick={resetLocalStorage}>Clear Cache</button>
              <p>
                If error persists, raise an issue on our github page{" "}
                <a href="https://github.com/CS199-Instrella-Vidad/NSNP-Extension">
                  Here
                </a>
              </p>
            </div>
          }
        >
          <NSNP />
        </ErrorBoundary>
      </div>
    </>
  );
}

export default App;
