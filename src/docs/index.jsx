import React from "react";
import { render } from "react-dom";
import WingTron from "../../lib/WingTron.js";
import "./styles.css";

function Demo() {
  return (
    <div>
      <h1>Wing-Tron:</h1>
      <div id="gameContainer" style={{width: '50%'}}>
        <WingTron />
      </div>
    </div>
  );
}

render(<Demo />, document.getElementById("app"));
