import { h } from "preact";
import { useChannel } from "../../hooks/use-channel";
import { SocketProvider } from "../../components/socket-provider";

const Spectate = (props) => {
  return (
    <SocketProvider wsUrl={process.env.PREACT_APP_WS_URL}>
      <SpectateImpl {...props} />
    </SocketProvider>
  );
};

const SpectateImpl = (props) => {
  const channel = useChannel(`game:${props.gameId}`);

  return <div>Spectate {props.gameId}</div>;
};

export default Spectate;
