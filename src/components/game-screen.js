import { h } from "preact";
import { useRef, useEffect } from "preact/hooks";

const renderPlayer = (ctx, player, engine) => {
  ctx.fillRect(
    player.position.x,
    player.position.y,
    engine.playerSize.width,
    engine.playerSize.height
  );
};

const renderBall = (ctx, ball, engine) => {
  ctx.save();
  ctx.beginPath();

  ctx.translate(ball.x - engine.ballSize, ball.y - engine.ballSize);
  ctx.scale(engine.ballSize, engine.ballSize);
  ctx.arc(1, 1, 1, 0, 2 * Math.PI, false);

  ctx.fillStyle = "#31abde";
  ctx.fill();
  ctx.restore();
};

const GameScreen = ({ gameState }) => {
  const canvasRef = useRef(null);

  const height = gameState.engine.gameHeight;
  const width = gameState.engine.gameWidth;

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const ctx = canvasRef.current.getContext("2d");

    ctx.clearRect(0, 0, width, height);

    gameState.players.forEach((player) => {
      renderPlayer(ctx, player, gameState.engine);
    });

    renderBall(ctx, gameState.ball, gameState.engine);
  }, [gameState, width, height]);

  return (
    <div style={{ width, height, overflow: "none", border: "1px solid red" }}>
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
};

export default GameScreen;
