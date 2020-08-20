import { h, Fragment } from "preact";
import { useMemo, useState, useCallback, useEffect } from "preact/hooks";
import { usePress } from "@react-aria/interactions";

import { useChannel } from "../../hooks/use-channel";
import { SocketProvider } from "../../components/socket-provider";
import GameStats from "../../components/game-stats";
import ChevronLeft from "../../components/icons/chevron-left";
import ChevronRight from "../../components/icons/chevron-right";

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
      setGameState({ event, payload });
    },
    [setGameState]
  );

  useChannel(`game:${gameId}`, onChannelMessage);
  const broadcast = useChannel(`game:${gameId}:player`, onChannelMessage);

  const { pressProps: leftPressProps, isPressed: isLeftPressed } = usePress({
    onPressStart: () => {
      broadcast("new_player_action", { action: "left_button_pressed" });
    },
    onPressEnd: () => {
      broadcast("new_player_action", { action: "left_button_released" });
    },
  });

  const { pressProps: rightPressProps, isPressed: isRightPressed } = usePress({
    onPressStart: () => {
      broadcast("new_player_action", { action: "right_button_pressed" });
    },
    onPressEnd: () => {
      broadcast("new_player_action", { action: "right_button_released" });
    },
  });

  return (
    <Fragment>
      <Controller>
        <ControllerButton isPressed={isLeftPressed} {...leftPressProps}>
          <ChevronLeft size="200" />
        </ControllerButton>
        <ControllerButton isPressed={isRightPressed} {...rightPressProps}>
          <ChevronRight size="200" />
        </ControllerButton>
      </Controller>
    </Fragment>
  );
};

const Controller = (props) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto auto",
        gap: "20px",
        height: "100%",
      }}
    >
      {props.children}
    </div>
  );
};

const pressedStyles = {
  background: "red",
};

const ControllerButton = ({ isPressed, children, ...props }) => {
  return (
    <div
      {...props}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...(isPressed ? pressedStyles : {}),
      }}
    >
      {children}
    </div>
  );
};

export default Player;
