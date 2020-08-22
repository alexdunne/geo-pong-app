import { h, Fragment } from "preact";
import { useChannel } from "../../hooks/use-channel";
import { SocketProvider } from "../../components/socket-provider";
import { useState, useCallback } from "preact/hooks";
import differenceInSeconds from "date-fns/differenceInSeconds";
import parseISO from "date-fns/parseISO";
import GameScreen from "../../components/game-screen";
import QRCode from "react-qr-code";

const Spectate = (props) => {
  return (
    <SocketProvider wsUrl={process.env.PREACT_APP_WS_URL}>
      <SpectateImpl {...props} />
    </SocketProvider>
  );
};

const SpectateImpl = (props) => {
  const [gameState, setGameState] = useState(null);

  const onChannelMessage = useCallback(
    (event, payload) => {
      if (event !== "game_state") {
        return;
      }
      setGameState(payload);
    },
    [setGameState]
  );

  useChannel(`game:${props.gameId}`, onChannelMessage);

  const isLoading =
    gameState === null || gameState.status === "waiting_for_players";
  const isCountingDown = gameState?.status === "countdown_in_progress";
  const isPlaying = gameState?.status === "game_in_progress";
  const isGameOver = gameState?.status === "game_over";

  if (isLoading) {
    return <Loading gameId={props.gameId} />;
  }

  if (isCountingDown) {
    return <Countdown gameStartTime={gameState.gameStartTime} />;
  }

  if (isPlaying) {
    return <GameScreen gameState={gameState} />;
  }

  if (isGameOver) {
    return <GameOver />;
  }

  console.log(gameState);

  return null;
};

const Loading = (props) => {
  const joinPath = `/join/${props.gameId}`;

  return (
    <Fragment>
      <div>Spectate {props.gameId}</div>
      <div>
        <a href={joinPath} target="_blank" rel="noreferrer">
          {joinPath}
        </a>
      </div>
      <QRCode value={`${window.location.host}${joinPath}`} />
    </Fragment>
  );
};

const Countdown = (props) => {
  const seconds = differenceInSeconds(
    parseISO(props.gameStartTime),
    Date.now()
  );

  return <div>{seconds}</div>;
};

const GameOver = () => {
  return <div>Game over!</div>;
};

export default Spectate;
