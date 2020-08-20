import { h, Fragment } from "preact";
import { useState, useEffect, useCallback } from "preact/hooks";
import { route } from "preact-router";
import { gameInstanceApi } from "../../api/game-instance-client";

const JoinStatus = {
  Idle: 1,
  Joining: 2,
  Error: 3,
};

const JoinGame = ({ gameId }) => {
  const [joinStatus, setJoinStatus] = useState(JoinStatus.Idle);
  const [code, setCode] = useState(gameId ?? "");

  const joinGame = useCallback(
    async (code) => {
      try {
        setJoinStatus(JoinStatus.Joining);

        const { token } = await gameInstanceApi.join(code);

        route(`/game/${code}/player/${encodeURIComponent(token)}`);
      } catch (e) {
        setJoinStatus(JoinStatus.Error);
      }
    },
    [setJoinStatus]
  );

  useEffect(() => {
    // Automatically attempt to join if a gameId is present
    if (gameId) {
      joinGame(gameId);
    }
  }, [joinGame, gameId]);

  const onSubmit = async (e) => {
    e.preventDefault();

    joinGame(code);
  };

  const onInput = (e) => {
    const { value } = e.target;
    setCode(value);
  };

  return (
    <Fragment>
      {joinStatus === JoinStatus.Idle ? (
        <form onSubmit={onSubmit}>
          <label>
            Game code
            <input type="text" value={code} onInput={onInput} />
          </label>
        </form>
      ) : joinStatus === JoinStatus.Joining ? (
        <div>Joining</div>
      ) : joinStatus === JoinStatus.Error ? (
        <div>Error</div>
      ) : null}
    </Fragment>
  );
};

export default JoinGame;
