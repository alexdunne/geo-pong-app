import { h, Fragment } from "preact";
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
  useChannel(`game:${props.gameId}`);

  const joinPath = `/join/${props.gameId}`;

  return (
    <Fragment>
      <div>Spectate {props.gameId}</div>
      <div>
        <a href={joinPath} target="_blank" rel="noreferrer">
          {joinPath}
        </a>
      </div>
    </Fragment>
  );
};

export default Spectate;
