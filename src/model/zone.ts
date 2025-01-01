import { World } from "../state/world";
import { Character, CharacterPrototype } from "./character";
import { Reset } from "./reset";
import { Room } from "./room";

export const DEFAULT_RESET_INTERVAL = 15 * 60 * 1000;

export class Zone {
  id = "";
  name = "";
  description = "";
  resetInterval = DEFAULT_RESET_INTERVAL;

  rooms = new Map<string, Room>();
  characters = new Map<string, CharacterPrototype>();
  resets: Reset[] = [];

  reset(world: World) {
    for (const reset of this.resets) {
      reset.reset(world);
    }
  }
}
