import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import React from "react";
import Pad from "./components/Pad";

function App() {
  const [display, setDisplay] = useState("");

  const playSfx = async (id) => {
    const audio = document.querySelector(`#${id}`).children[0];
    await audio.play();

    setDisplay(id);
    setTimeout(function () {
      document.querySelector(`#${id}`).blur();
    }, 100);
  };

  const handleKeydown = (e) => {
    const char = String.fromCharCode(e.keyCode);
    const buttonPad = document.querySelector(`#drum-pad-${char}`);
    buttonPad.focus();
    buttonPad.click();

    setDisplay(`rum-pad-${char}`);
    setTimeout(function () {
      buttonPad.blur();
    }, 100);
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return (
    <div id="drum-machine">
      <div id="control">
        <label className="label">Simple Drumpad</label>
        <div className="container-flex">
          <div>
            <label>Volume</label>
            <input type={"range"} />
          </div>
          <div>
            <label>Mute</label>
            <input type={"checkbox"} />
          </div>
        </div>
      </div>
      <div id="display">{display}</div>
      {audioSamples.map((sample, i) => (
        <Pad
          audio={sample.audio}
          label={sample.key}
          handlePlay={playSfx}
          key={i}
        />
      ))}
    </div>
  );
}

export default App;

const audioSamples = [
  { key: "Q", audio: "../src/assets/sfx/drumpad/808-bd01.wav" },
  { key: "W", audio: "../src/assets/sfx/drumpad/808-chi1.wav" },
  { key: "E", audio: "../src/assets/sfx/drumpad/808-cla1.wav" },
  { key: "A", audio: "../src/assets/sfx/drumpad/808-clap1.wav" },
  { key: "S", audio: "../src/assets/sfx/drumpad/808-clo1.wav" },
  { key: "D", audio: "../src/assets/sfx/drumpad/808-cme1.wav" },
  { key: "Z", audio: "../src/assets/sfx/drumpad/808-hh01.wav" },
  { key: "X", audio: "../src/assets/sfx/drumpad/808-ma1.wav" },
  { key: "C", audio: "../src/assets/sfx/drumpad/808-rim1.wav" },
];
