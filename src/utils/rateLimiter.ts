export class RateLimiter {
  private timestamps: number[] = [];
  private readonly limit: number;
  private readonly interval: number;

  constructor(limit: number, interval: number) {
    this.limit = limit;
    this.interval = interval;
  }

  canMakeRequest(): boolean {
    const now = Date.now();
    // Remove old timestamps
    this.timestamps = this.timestamps.filter(
      (timestamp) => now - timestamp < this.interval
    );

    if (this.timestamps.length >= this.limit) {
      return false;
    }

    this.timestamps.push(now);
    return true;
  }
}
