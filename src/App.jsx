import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import React from "react";
import Pad from "./components/Pad";
import {
  IoVolumeHighSharp,
  IoVolumeMuteSharp,
  IoVolumeLowSharp,
  IoVolumeMediumSharp,
} from "react-icons/io5";

import sfx0 from "./assets/sfx/drumpad/808-bd01.wav";
import sfx1 from "./assets/sfx/drumpad/808-cla1.wav";
import sfx2 from "./assets/sfx/drumpad/808-clap1.wav";
import sfx3 from "./assets/sfx/drumpad/808-clo1.wav";
import sfx4 from "./assets/sfx/drumpad/808-cme1.wav";
import sfx5 from "./assets/sfx/drumpad/808-hh01.wav";
import sfx6 from "./assets/sfx/drumpad/808-ma1.wav";
import sfx7 from "./assets/sfx/drumpad/808-rim1.wav";
import sfx8 from "./assets/sfx/drumpad/808-chi1.wav";

function App() {
  const [display, setDisplay] = useState("Tap to play");
  const [volume, setVolume] = useState(1);
  const [isMute, setIsMute] = useState(false);

  const playSfx = async (id) => {
    const audio = document.querySelector(`#${id}`).children[0];
    await audio.play();

    const time = new Date().getTime();
    setDisplay(`${id} pressed on: ${time}`);
    setTimeout(function () {
      document.querySelector(`#${id}`).blur();
    }, 100);
  };

  const handleKeydown = (e) => {
    const char = String.fromCharCode(e.keyCode);
    const buttonPad = document.querySelector(`#drum-pad-${char}`);
    buttonPad.focus();
    buttonPad.click();
    const time = new Date().getTime();
    setDisplay(`rum-pad-${char} pressed on: ${time}`);
    setTimeout(function () {
      buttonPad.blur();
    }, 100);
  };

  const handleVolume = (e) => {
    setIsMute(false);
    setVolume(e.target.value);
  };

  const handleMute = () => setIsMute(!isMute);

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
          <button className="volume-container" onClick={handleMute}>
            {volume == 0 || isMute ? (
              <IoVolumeMuteSharp color="#ffffff" size={24} />
            ) : volume < 0.5 ? (
              <IoVolumeLowSharp
                color="#ffffff"
                size={24}
                style={{ marginLeft: "-2px" }}
              />
            ) : volume == 1 ? (
              <IoVolumeHighSharp color="#ffffff" size={24} />
            ) : (
              <IoVolumeMediumSharp
                color="#ffffff"
                size={24}
                style={{ marginLeft: "-1px" }}
              />
            )}
          </button>
          <input
            id="volume-control"
            type={"range"}
            min={0}
            max={1}
            step={0.01}
            onChange={handleVolume}
          />
        </div>
      </div>
      <div id="display">{display}</div>
      {audioSamples.map((sample, i) => (
        <Pad
          volume={isMute ? 0 : volume}
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
  { key: "Q", audio: sfx0 },
  { key: "W", audio: sfx1 },
  { key: "E", audio: sfx2 },
  { key: "A", audio: sfx3 },
  { key: "S", audio: sfx4 },
  { key: "D", audio: sfx5 },
  { key: "Z", audio: sfx6 },
  { key: "X", audio: sfx7 },
  { key: "C", audio: sfx8 },
];
