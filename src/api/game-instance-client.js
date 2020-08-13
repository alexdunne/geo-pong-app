import { client } from "./api-client";

const create = () => {
  return client("instance", {
    method: "POST",
  });
};

const join = (gameId) => {
  return client(`instance/${gameId}/join`, {
    method: "POST",
  });
};

const gameInstanceApi = {
  create,
  join,
};

export { gameInstanceApi };
