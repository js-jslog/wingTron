import React from "react";
import { render } from "react-dom";
import WingTron from "../../src/lib/WingTron.jsx";
import ControlPanel from "./ControlPanel.jsx";
import "./styles.css";
// TODO: why is wingtron imported from src rather than the built lib

function Demo() {
  return (
    <div>
      <h1>Wing-Tron:</h1>
      <div id="gameContainer" style={{width: '25%'}}>
        <WingTron />
      </div>
      <div id="controlPanel">
        <ControlPanel />
      </div>
    </div>
  );
}

render(<Demo />, document.getElementById("app"));
