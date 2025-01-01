import { randomUUID, UUID } from "crypto";
import { Dice } from "./dice";
import { Pool } from "./pool";
import { Zone } from "./zone";

export const DEFAULT_ABILITY_SCORE = "3d6";

export class Character {
  readonly instanceId: UUID;
  readonly prototype: CharacterPrototype;
  name = "";
  description = "";

  health = new Pool(0, 100);
  mana = new Pool(0, 100);
  stamina = new Pool(0, 100);

  strength = 0;
  dexterity = 0;
  constitution = 0;
  intelligence = 0;
  wisdom = 0;
  charisma = 0;

  extraDescriptions = new Map<string, string>();

  constructor(character: CharacterPrototype) {
    this.instanceId = randomUUID();
    this.prototype = character;
  }

  get id() {
    return `${this.prototype.id}:${this.instanceId}`;
  }
}

export class CharacterPrototype {
  prototypeId = "";
  name = "";
  description = "";
  zone: Zone;

  health = new Dice();
  mana = new Dice();
  stamina = new Dice();

  strength = new Dice();
  dexterity = new Dice();
  constitution = new Dice();
  intelligence = new Dice();
  wisdom = new Dice();
  charisma = new Dice();

  extraDescriptions = new Map<string, string>();

  constructor(zone: Zone) {
    this.zone = zone;
  }

  instantiate() {
    const character = new Character(this);
    character.name = this.name;
    character.description = this.description;

    character.health = new Pool(this.health.roll());
    character.mana = new Pool(this.mana.roll());
    character.stamina = new Pool(this.stamina.roll());

    character.strength = this.strength.roll();
    character.dexterity = this.dexterity.roll();
    character.constitution = this.constitution.roll();
    character.intelligence = this.intelligence.roll();
    character.wisdom = this.wisdom.roll();
    character.charisma = this.charisma.roll();

    character.extraDescriptions = new Map(this.extraDescriptions);

    return character;
  }

  get id() {
    return `${this.zone.id}:${this.prototypeId}`;
  }
}
