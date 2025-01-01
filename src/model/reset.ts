import { World } from "../state/world";
import { Destination } from "./exit";

export abstract class Reset {
  abstract reset(world: World): void;
}

export class CreateMobileReset extends Reset {
  id = "";
  room = "";
  resets: Reset[] = [];

  reset(world: World) {
    const mobilePrototype = world.items.get(this.id);
    const room = world.rooms.get(this.room);
  }
}

export class CreateItemInRoomReset extends Reset {
  id = "";
  room = "";
  resets: Reset[] = [];

  reset(world: World): void {}
}
