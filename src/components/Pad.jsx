import React from "react";

export default function Pad({ audio, label, handlePlay, volume }) {
  const audioRef = React.useRef(null);

  React.useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  return (
    <button
      onClick={(e) => handlePlay(e.target.id)}
      className="drum-pad"
      id={`drum-pad-${label}`}
    >
      {label}
      <audio
        ref={audioRef}
        hidden
        className="clip"
        src={audio}
        type="audio/x-wav"
        id={label}
      />
    </button>
  );
}
