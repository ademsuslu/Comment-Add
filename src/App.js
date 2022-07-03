import { useEffect, useRef, useState } from "react";
import "./App.css";
import LeaveComment from "./Components/LeaveComment";
import MainContext from "./Components/MainContext";
import Note from "./Components/Note";
import NoteBox from "./Components/NoteBox";
function App() {
  const [notes, setNotes] = useState(
    (localStorage.notes && JSON.parse(localStorage.notes)) || []
  );
  const [mode, setMode] = useState(false);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });
  const [boxPosition, setBoxPozition] = useState({
    x: 0,
    y: 0,
  });
  const [boxVisible, setBoxVisible] = useState(false);

  useEffect(() => {
    screen.current.focus();
  }, []);
  useEffect(() => {
    localStorage.setItem("Notes", JSON.stringify(notes));
  }, []);
  const screen = useRef(null);
  const handleKeyUp = (e) => {
    if (e.key === "c") {
      setMode(!mode);
      setBoxVisible(false);
      console.log("Comment Mode aktif");
    }
    if (e.key === "Escape") {
      setBoxVisible(false);
    }
  };
  const handleMove = (e) => {
    if (mode) {
      setPosition({
        x: [e.pageX, e.clientX],
        y: [e.pageY, e.clientY],
      });
    }
  };
  const handleClick = () => {
    if (mode) {
      setBoxPozition({
        x: position.x[0],
        y: position.y[0],
      });
      setBoxVisible(true);
    }
  };
  const data = {
    position,
    boxPosition,
    boxVisible,
    setBoxVisible,
    setMode,
    notes,
    setNotes,
  };
  return (
    <MainContext.Provider value={data}>
      <div
        onClick={handleClick}
        onMouseMove={handleMove}
        tabIndex={0}
        onKeyUp={handleKeyUp}
        ref={screen}
        className={`screen ${mode && "editable"}`}
      >
        <img
          style={{
            height: "100vh",
          }}
          src="https://images.unsplash.com/photo-1500350347612-85b7eff2f759?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=413&q=80"
          alt=""
        />
        {mode && <LeaveComment />}

        {notes.map((note, idx) => {
          return <Note key={idx} {...note} />;
        })}

        {boxVisible && <NoteBox />}
      </div>
    </MainContext.Provider>
  );
}

export default App;
