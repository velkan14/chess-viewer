import React, { useState } from "react";
import { useChessState } from "../ChessContext/useChessState";

const FenForm = () => {
  const { load, getFen } = useChessState();

  const [input, setInput] = useState(
    "8/5k2/3p4/1p1Pp2p/pP2Pp1P/P4P1K/8/8 b - - 99 50"
  );

  const onLoad = (e) => {
    e.preventDefault();
    load(input);
  };

  return (
    <div>
      <form className="FenForm" onSubmit={onLoad}>
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
