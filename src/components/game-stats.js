import { h } from "preact";
import { useRef } from "preact/hooks";
import { useDrag } from "../hooks/use-drag";

const GameStats = ({ gameState }) => {
  const statsElementRef = useRef();

  const position = useDrag(statsElementRef);

  return (
    <div
      ref={statsElementRef}
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        padding: "8px",
        cursor: "grab",
        userSelect: "none",
        backgroundColor: "#eaeaea",
        borderRadius: "8px",
      }}
    >
      {gameState ? <pre>{JSON.stringify(gameState, null, 2)}</pre> : null}
    </div>
  );
};

export default GameStats;
