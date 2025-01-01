const DICE_PATTERN = /^(\d+)d(\d+)([+-]\d+)?$/;

export class Dice {
  amount = 1;
  sides = 1;
  modifier = 0;

  constructor(amount = 1, sides = 1, modifier = 0) {
    this.amount = amount;
    this.sides = sides;
    this.modifier = modifier;
  }

  roll() {
    let total = 0;
    for (let i = 0; i < this.amount; i++) {
      total += Math.floor(Math.random() * this.sides) + 1;
    }

    return total + this.modifier;
  }

  toString() {
    let output = `${this.amount}d${this.sides}`;
    if (this.modifier > 0) {
      output += `+${this.modifier}`;
    } else if (this.modifier < 0) {
      output += this.modifier;
    }

    return output;
  }

  static fromString(input: string) {
    const match = input.match(DICE_PATTERN);
    if (!match) {
      throw new Error(`Invalid dice notation: ${input}`);
    }

    const amount = parseInt(match[1], 10);
    const sides = parseInt(match[2], 10);
    const modifier = match[3] ? parseInt(match[3], 10) : 0;

    return new Dice(amount, sides, modifier);
  }

  static roll(amount: string): number;
  static roll(amount: number, sides: number, modifier?: number): number;
  static roll(amount: number | string, sides?: number, modifier?: number) {
    if (typeof amount === "string") {
      return Dice.fromString(amount).roll();
    }
    return new Dice(amount, sides, modifier).roll();
  }
}
