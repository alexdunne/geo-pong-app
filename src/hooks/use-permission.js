import { useState, useEffect, useCallback } from "preact/hooks";

export const PermissionStatus = {
  Unknown: 1,
  Denied: 2,
  Granted: 3,
  Prompt: 4,
};

const convertResultToStatus = (result) => {
  switch (result.state) {
    case "denied":
      return PermissionStatus.Denied;
    case "granted":
      return PermissionStatus.Granted;
    case "prompt":
      return PermissionStatus.Granted;
    default:
      return PermissionStatus.Unknown;
  }
};

const fetchCurrentStatus = async (permission) => {
  return navigator.permissions.query({ name: permission }).then((result) => {
    return convertResultToStatus(result);
  });
};

const usePermission = (permission) => {
  const [status, setStatus] = useState(PermissionStatus.Unknown);

  useEffect(() => {
    let ignore = false;

    const fetchStatus = async () => {
      const status = await fetchCurrentStatus(permission);

      if (!ignore) {
        setStatus(status);
      }
    };

    fetchStatus();

    return () => {
      ignore = true;
    };
  }, [permission]);

  const requestPermission = useCallback(async () => {
    switch (status) {
      case PermissionStatus.Unknown:
        throw new Error("Current permission unknown");
      case PermissionStatus.Denied:
        throw new Error("The requesed permission has alreay been denied");
      case PermissionStatus.Granted:
        return { granted: true };
    }

    const result = await navigator.permissions.request({ name: permission });
    const resultStatus = convertResultToStatus(result);

    setStatus(resultStatus);

    return { granted: resultStatus === PermissionStatus.Granted };
  }, [permission, status]);

  return [status, requestPermission];
};

export { usePermission };
