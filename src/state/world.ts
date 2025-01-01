import { Zone } from "../model/zone";
import { Item, ItemProtoype } from "../model/item";
import { Room } from "../model/room";

export class World {
  rooms = new Map<string, Room>();
  items = new Map<string, Item>();
  zones = new Map<string, Zone>();

  itemPrototypes = new Map<string, ItemProtoype>();

  reset() {
    for (const area of this.zones.values()) {
      area.reset(this);
    }
  }
}
