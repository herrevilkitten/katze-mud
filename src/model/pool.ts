export class Pool {
  private minimum: number;
  private maximum: number;
  private current: number;

  constructor(minimum: number, maximum?: number) {
    if (maximum === undefined) {
      maximum = minimum;
    }
    this.minimum = minimum;
    this.maximum = maximum;
    this.current = maximum;
  }

  add(amount: number) {
    this.current = Math.min(this.current + amount, this.maximum);
  }

  subtract(amount: number) {
    this.current = Math.max(this.current - amount, this.minimum);
  }

  fill() {
    this.current = this.maximum;
  }

  empty() {
    this.current = this.minimum;
  }

  get value() {
    return this.current;
  }

  isFilled() {
    return this.current === this.maximum;
  }

  isEmpty() {
    return this.current === this.minimum;
  }
}
