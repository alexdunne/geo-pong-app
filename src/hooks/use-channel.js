const { useSocket } = require("../components/socket-provider");
const { useEffect } = require("preact/hooks");

const useChannel = (topic, callback) => {
  const socket = useSocket();

  useEffect(() => {
    return connectToChannel(socket, topic, callback);
  }, [socket, topic, callback]);
};

const connectToChannel = (socket, topic, callback) => {
  const channel = socket.channel(topic);

  channel.onMessage = callback;

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
