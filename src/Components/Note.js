import React, { useContext, useState } from "react";
import Draggable from "react-draggable"; // The default
import MainContext from "./MainContext";

export default function Note(note) {
  const [visible, setVisible] = useState();
  const { setMode, notes, setNotes } = useContext(MainContext);
  const [clickable, setClicable] = useState(true);
  const showMote = () => {
    if (clickable) {
      setVisible(!visible);
    }
  };
  const setNotePosition = (e, data) => {
    const currentNote = notes.find((n) => n.number === note.number);
    currentNote.position = {
      x: data.x,
      y: data.y,
    };
    setNotes([...notes.filter((n) => n.number !== note.number), currentNote]);
    console.log(currentNote);
  };
  return (
    <Draggable
      onDrag={() => setClicable(false)}
      onStart={() => setClicable(true)}
      onStop={setNotePosition}
      defaultPosition={{ x: note.position.x, y: note.position.y }}
    >
      <div
        onMouseEnter={() => setMode(false)}
        onMouseLeave={() => setMode(true)}
        className="note-container"
        style={{
          "--color": note.color,
          position: "absolute",
          top: note.position.y,
          left: note.position.x,
        }}
      >
        <span onClick={showMote} className="note-box-number">
          {note.number}
        </span>
        <div className="note" style={{ display: visible ? "flex" : "none" }}>
          {note.note}
        </div>
      </div>
    </Draggable>
  );
}
