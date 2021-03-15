import React, { useState } from "react";
import { useChessState } from "../../hooks/useChessState";
import "./FenForm.css";

const FenForm = () => {
  const { load, getFen } = useChessState();

  const [input, setInput] = useState(
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  );

  const onLoad = (e) => {
    e.preventDefault();
    load(input);
  };

  return (
    <div className="FenForm">
      <form onSubmit={onLoad}>
        <input
          type="text"
          placeholder="Fen..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button>Load Fen</button>
      </form>
      <p>{getFen()}</p>
    </div>
  );
};

export default FenForm;
