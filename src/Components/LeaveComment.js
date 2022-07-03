import React, { useContext } from "react";

import MainContext from "./MainContext";

export default function LeaveComment() {
  const { position } = useContext(MainContext);
  return (
    <div
      className="leave-comment-text"
      style={{
        position: "fixed",
        top: position.y[1],
        left: position.x[1] + 200,
      }}
    >
      yorum yazmak ıcın tıkla
    </div>
  );
}
