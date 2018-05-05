import React from "react";
import { render } from "react-dom";
import WingTron from "../../lib/index.js";
import "./styles.css";

function Demo() {
  return (
    <div>
      <h1>Demo with examples of the component</h1>
      <WingTron />
    </div>
  );
}

render(<Demo />, document.getElementById("app"));
