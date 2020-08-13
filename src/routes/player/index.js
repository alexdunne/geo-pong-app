import { h, Fragment } from "preact";
import { useChannel } from "../../hooks/use-channel";
import { SocketProvider } from "../../components/socket-provider";
import { useMemo, useState, useCallback } from "preact/hooks";

const Player = ({ gameId, playerToken }) => {
  const socketParams = useMemo(() => {
    return {
      token: playerToken,
    };
  }, [playerToken]);

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
