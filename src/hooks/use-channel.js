const { useSocket } = require("../components/socket-provider");
const { useEffect } = require("preact/hooks");

const useChannel = (topic) => {
  const socket = useSocket();

  useEffect(() => {
    return connectToChannel(socket, topic);
  }, [socket, topic]);
};

const connectToChannel = (socket, topic) => {
  const channel = socket.channel(topic);

  channel.onMessage = (event, payload) => {
    console.log({ event, payload });
  };

  channel
    .join()
    .receive("ok", (resp) => {
      console.log("Joined successfully", resp);
    })
    .receive("error", (resp) => {
      console.log("Unable to join", resp);
    });

  return () => {
    channel.leave();
  };
};

export { useChannel };
