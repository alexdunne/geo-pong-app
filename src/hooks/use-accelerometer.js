import { useState, useEffect } from "preact/hooks";

const useAccelerometer = (frequency = 60) => {
  const [position, setPosition] = useState({ x: null, y: null, z: null });

  useEffect(() => {
    const acl = new window.Accelerometer({ frequency });

    console.log(acl);

    const eventListener = () => {
      setPosition({ x: acl.x, y: acl.y, z: acl.z });
    };

    acl.addEventListener("reading", eventListener);

    acl.start();

    return () => {
      acl.stop();
      acl.removeEventListener("reading", eventListener);
    };
  }, [frequency]);

  return position;
};

export { useAccelerometer };
