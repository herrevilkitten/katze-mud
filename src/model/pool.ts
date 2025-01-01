const POOL_PATTERN = /^(\d+)(?:[\-](\d+))?$/;

export class Pool {
  private minimum: number;
  private maximum: number;
  private current: number;

  constructor(minimum: number, maximum?: number) {
    if (maximum === undefined || Number.isNaN(maximum)) {
      maximum = minimum;
    }
    if (minimum < 0) {
      throw new RangeError("Minimum value cannot be less than 0");
    }
    if (minimum > maximum) {
      throw new RangeError(
        `Minimum value ${minimum} cannot be greater than maximum value ${maximum}`
      );
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

  percent() {
    return (this.current / this.maximum) * 100;
  }

  get value() {
    return this.current;
  }

  isFull() {
    return this.current === this.maximum;
  }

  isEmpty() {
    return this.current === this.minimum;
  }

  static fromString(input: string) {
    const match = input.match(POOL_PATTERN);
    if (!match) {
      throw new SyntaxError(`Invalid pool notation: ${input}`);
    }

    const minimum = parseInt(match[1], 10);
    const maximum = parseInt(match[2], 10);
    return new Pool(minimum, maximum);
  }
}
