import React from "react";
import { render } from "react-dom";
import WingTron from "~/WingTron.jsx";
import ControlPanel from "./ControlPanel.jsx";
import "./styles.css";

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
