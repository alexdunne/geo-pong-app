import { h } from "preact";
import { useRef, useEffect } from "preact/hooks";

const renderPlayer = (ctx, player, meta) => {
  ctx.fillRect(
    player.position.x,
    player.position.y,
    meta.playerSize.width,
    meta.playerSize.height
  );
};

const GameScreen = ({ gameState }) => {
  const canvasRef = useRef(null);

  const height = gameState.meta.gameHeight;
  const width = gameState.meta.gameWidth;

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const ctx = canvasRef.current.getContext("2d");

    ctx.clearRect(0, 0, width, height);

    gameState.players.forEach((player) => {
      renderPlayer(ctx, player, gameState.meta);
    });
  }, [gameState, width, height]);

  return (
    <div style={{ width, height, overflow: "none", border: "1px solid red" }}>
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
};

export default GameScreen;
