import { Exit } from "./exit";
import { Zone } from "./zone";

export class Room {
  prototypeId = "";
  name = "";
  description = "";
  zone: Zone;

  exits = new Map<string, Exit>();
  extraDescriptions = new Map<string, string>();

  constructor(zone: Zone) {
    this.zone = zone;
  }

  get id() {
    return `${this.zone.id}:${this.prototypeId}`;
  }
}
