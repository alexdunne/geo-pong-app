import { h, Fragment } from "preact";
import { useChannel } from "../../hooks/use-channel";
import { SocketProvider } from "../../components/socket-provider";
import { useMemo, useState, useCallback, useEffect } from "preact/hooks";
import { useAccelerometer } from "../../hooks/use-accelerometer";

const Player = ({ gameId, playerToken }) => {
  const socketParams = useMemo(() => ({ token: playerToken }), [playerToken]);

  return (
    <SocketProvider wsUrl={process.env.PREACT_APP_WS_URL} params={socketParams}>
      <PlayerImpl gameId={gameId} />
    </SocketProvider>
  );
};

const PlayerImpl = ({ gameId }) => {
  const [gameState, setGameState] = useState(null);

  const onChannelMessage = useCallback(
    (event, payload) => {
      setGameState({
        event,
        payload,
      });
    },
    [setGameState]
  );

  useChannel(`game:${gameId}`, onChannelMessage);
  const broadcast = useChannel(`game:${gameId}:player`, onChannelMessage);

  const position = useAccelerometer();

  useEffect(() => {
    console.log({ position });
    // broadcast("move", position);
  }, [broadcast, position]);

  return (
    <Fragment>
      <div>Player {gameId}</div>
      <div>
        {gameState ? <pre>{JSON.stringify(gameState, null, 2)}</pre> : null}
      </div>
    </Fragment>
  );
};

export default Player;
