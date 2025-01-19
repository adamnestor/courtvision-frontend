interface ConnectionStatusProps {
  connected: boolean;
}

export const ConnectionStatus = ({ connected }: ConnectionStatusProps) => {
  return (
    <div
      className={`flex items-center gap-2 ${
        connected ? "text-success" : "text-destructive"
      }`}
    >
      <div
        className={`w-2 h-2 rounded-full ${
          connected ? "bg-success" : "bg-destructive"
        }`}
      />
      <span>{connected ? "Connected" : "Disconnected"}</span>
    </div>
  );
};
