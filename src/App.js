import "./App.css";
import Board from "./components/Board/Board";
import FenForm from "./components/FenForm/FenForm";
import RandomButton from "./components/RandomButton/RandomButton";
import { ChessProvider } from "./components/ChessContext/ChessContext";
import ForkMeOnGithub from "fork-me-on-github";

function App() {
  return (
    <div className="App">
      <main className="App-main">
        <ForkMeOnGithub
          repo="https://github.com/velkan14/chess-viewer"
          colorBackground="white"
          colorOctocat="black"
        />
        <ChessProvider>
          <FenForm />
          <RandomButton />
          <Board />
        </ChessProvider>
      </main>
    </div>
  );
}

export default App;
