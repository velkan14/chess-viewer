import "./App.css";
import Board from "./components/Board/Board";
import FenForm from "./components/FenForm/FenForm";
import RandomButton from "./components/RandomButton/RandomButton";
import { ChessProvider } from "./components/ChessContext/ChessContext";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ChessProvider>
          <FenForm />
          <Board />
          <RandomButton />
        </ChessProvider>
      </header>
    </div>
  );
}

export default App;
