import { h } from "preact";
import { route } from "preact-router";
import { Link } from "preact-router/match";
import { useState, useEffect } from "preact/hooks";
import style from "./style";
import { create as createGameInstance } from "../../api/game-instance-client";

const NewGameStatus = {
  Idle: 1,
  Creating: 2,
  Created: 3,
  Error: 4,
};

const Home = () => {
  const [newGameStatus, setNewGameStatus] = useState(NewGameStatus.Idle);

  useEffect(() => {
    if (newGameStatus === NewGameStatus.Creating) {
      createGameInstance()
        .then((instance) => {
          route(`/spectate/${instance.id}`);
        })
        .catch((e) => {
          console.log(e);
          setNewGameStatus(NewGameStatus.Error);
        });
    }
  }, [newGameStatus]);

  return (
    <div class={style.home}>
      {newGameStatus === NewGameStatus.Creating ? (
        <div>
          <p>Creating a new game</p>
        </div>
      ) : newGameStatus === NewGameStatus.Error ? (
        <div>
          <p>Something went wrong whilst creating the game</p>
        </div>
      ) : (
        <ul>
          <li>
            <button
              onClick={() => {
                setNewGameStatus(NewGameStatus.Creating);
              }}
            >
              Create new game
            </button>
          </li>
          <li>
            <Link href="/join">Join a game</Link>
          </li>
          <li>
            <Link href="/spectate">Spectate</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Home;
