import { h } from "preact";
import { usePermission, PermissionStatus } from "../hooks/use-permission";

const PermissionGuard = ({ permission, reason, children }) => {
  const [status, requestPermission] = usePermission(permission);

  if (status === PermissionStatus.Granted) {
    return children;
  }

  if (status === PermissionStatus.Denied) {
    return <Denied reason={reason} />;
  }

  if (status === PermissionStatus.Prompt) {
    return <Prompt reason={reason} onPrompt={requestPermission} />;
  }

  return <div>Loading</div>;
};

const Denied = ({ reason }) => {
  return (
    <div>
      <p>You have denied access to this permission.</p>

      <p>{reason}</p>
    </div>
  );
};

const Prompt = ({ reason, onPrompt }) => {
  return (
    <div>
      <p>{reason}</p>

      <button onClick={onPrompt}>Give permission</button>
    </div>
  );
};

export { PermissionGuard };
