const { useSocket } = require("../components/socket-provider");
const { useEffect, useRef } = require("preact/hooks");

const useChannel = (topic, callback) => {
  const socket = useSocket();
  const broadcast = useRef(null);

  useEffect(() => {
    const channel = socket.channel(topic);

    channel.onMessage = (event, payload) => {
      callback(event, payload);

      return payload;
    };

    channel
      .join()
      .receive("ok", (resp) => {
        console.log("Joined successfully", resp);
      })
      .receive("error", (resp) => {
        console.log("Unable to join", resp);
      });

    broadcast.current = channel.push.bind(channel);

    return () => {
      channel.leave();
    };
  }, [socket, topic, callback]);

  return broadcast.current;
};

export { useChannel };
