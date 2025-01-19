import { GameResult } from "../../types/player";

interface PlayerHistoryProps {
  games: GameResult[];
}

export const PlayerHistory = ({ games }: PlayerHistoryProps) => {
  return (
    <div className="bg-card rounded-lg p-4">
      <h3 className="font-semibold mb-4">Recent Games</h3>
      <div className="space-y-2">
        {games.map((game) => (
          <div
            key={game.id}
            className="flex items-center justify-between p-2 hover:bg-muted/50 rounded"
          >
            <div>
              <p className="font-medium">{game.opponent}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(game.date).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium">{game.statValue}</p>
              <p
                className={`text-sm ${
                  game.hitThreshold ? "text-success" : "text-destructive"
                }`}
              >
                {game.hitThreshold ? "Hit" : "Miss"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
