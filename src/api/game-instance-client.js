import { client } from "./api-client";

function create() {
  return client("instance", {
    method: "POST",
  });
}

export { create };
