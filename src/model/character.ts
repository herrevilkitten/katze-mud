import { Pool } from "./pool";

export class Character {
  id = "";
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
  
  constructor() {
    this.health.fill();
    this.mana.fill();
    this.stamina.fill();
  }
}