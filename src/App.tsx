import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { OptionOne } from "./OptionOne";
import { OptionTwo } from "./OptionTwo";

function OriginalApp() {
  return (
    <div>
      <img src={logo} className="App-logo" alt="logo" />
    </div>
  );
}

const options = ["original", "option one", "option two"] as const;

function App() {
  const [selected, setSelected] = useState<typeof options[number]>("original");
  return (
    <div className="App">
      <header className="App-header">
        {selected === "original" && <OriginalApp />}
        {selected === "option one" && <OptionOne />}
        {selected === "option two" && <OptionTwo />}
        {options.map((option) => (
          <button key={option} onClick={() => setSelected(option)}>
            {option}
          </button>
        ))}
      </header>
    </div>
  );
}

export default App;
