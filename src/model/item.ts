import { randomUUID, UUID } from "crypto";
import { Zone } from "./zone";

export class Item {
  readonly instanceId: UUID;
  readonly prototype: ItemProtoype;
  name = "";
  description = "";

  weight = 0;
  value = 0;
  material = "";

  extraDescriptions = new Map<string, string>();

  constructor(proto: ItemProtoype) {
    this.instanceId = randomUUID();
    this.prototype = proto;
  }

  get id() {
    return `${this.prototype.id}:${this.instanceId}`;
  }
}

export class ItemProtoype {
  prototypeId = "";
  name = "";
  description = "";
  zone: Zone;

  weight = 0;
  value = 0;
  material = "";

  extraDescriptions = new Map<string, string>();

  constructor(zone: Zone) {
    this.zone = zone;
  }

  instantiate() {
    const item = new Item(this);
    item.name = this.name;
    item.description = this.description;
    item.weight = this.weight;
    item.value = this.value;
    item.extraDescriptions = new Map(this.extraDescriptions);
    item.material = this.material;

    return item;
  }

  get id() {
    return `${this.zone.id}:${this.prototypeId}`;
  }
}
