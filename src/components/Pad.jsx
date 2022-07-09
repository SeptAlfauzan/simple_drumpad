export default function Pad({ audio, label, handlePlay }) {
  return (
    <button
      onClick={(e) => handlePlay(e.target.id)}
      className="drum-pad"
      id={`drum-pad-${label}`}
    >
      {label}
      <audio
        hidden
        className="clip"
        src={audio}
        type="audio/x-wav"
        id={label}
      />
    </button>
  );
}
