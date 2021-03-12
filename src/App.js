import "./App.css";
import Board from "./components/Board/Board";
import FenForm from "./components/FenForm/FenForm";
import { ChessProvider } from "./components/ChessContext/ChessContext";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ChessProvider>
          <FenForm />
          <Board />
        </ChessProvider>
      </header>
    </div>
  );
}

export default App;
