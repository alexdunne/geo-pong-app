import { h } from "preact";
import { useChannel } from "../../hooks/use-channel";
import { SocketProvider } from "../../components/socket-provider";
import { useMemo } from "preact/hooks";

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

const onChannelMessage = (event, payload) => {
  console.log("hi", event, payload);
};

const PlayerImpl = ({ gameId }) => {
  useChannel(`game:${gameId}`, onChannelMessage);

  return <div>Player {gameId}</div>;
};

export default Player;
