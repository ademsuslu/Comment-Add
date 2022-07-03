import React, { useContext, useState } from "react";
import MainContext from "./MainContext";

export default function NoteBox() {
  const { boxPosition, setMode, notes, setNotes, setBoxVisible } =
    useContext(MainContext);
  const types = [
    {
      name: "Comment",
      color: "red",
      text: "yorum",
    },
    {
      name: "Private Comment",
      color: "#999",
      text: "secret yorum",
    },
    {
      name: "Note",
      color: "orange",
      text: "note ",
    },
  ];
  const [color, setColor] = useState(types[0].color);
  const [note, setNote] = useState("");
  const changeColor = (e) => {
    setColor(e.target.value);
  };
  const addNote = (e) => {
    const currentNote = {
      note,
      number: note.length + 1,
      color,
      position: {
        x: boxPosition.x,
        y: boxPosition.y,
      },
    };
    setNotes([...notes, currentNote]);
    setBoxVisible(false);
    setMode(true);
  };

  return (
    <div
      onMouseEnter={() => setMode(false)}
      onMouseLeave={() => setMode(true)}
      className="note-box"
      style={{
        "--color": color,
        position: "absolute",
        top: boxPosition.y,
        left: boxPosition.x,
      }}
    >
      <span className="note-box-number">{notes.length + 1}</span>
      <select style={{ backgroundColor: color }} onChange={changeColor}>
        {types.map((type) => {
          return <option value={type.color}>{type.text}</option>;
        })}
      </select>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        cols="30"
        rows="5"
      ></textarea>
      <button onClick={addNote} disabled={!note}>
        Ekle
      </button>
    </div>
  );
}
