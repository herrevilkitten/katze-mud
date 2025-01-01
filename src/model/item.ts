export class Item {
  id = "";
  name = "";
  description = "";
  weight = 0;
  value = 0;
  material = "";

  extraDescriptions = new Map<string, string>();
}

export class ItemProtoype {
  id = "";
  name = "";
  description = "";
  weight = 0;
  value = 0;
  material = "";

  extraDescriptions = new Map<string, string>();

  instantiate() {
    const item = new Item();
    item.id = this.id;
    item.name = this.name;
    item.description = this.description;
    item.weight = this.weight;
    item.value = this.value;
    item.extraDescriptions = new Map(this.extraDescriptions);
    item.material = this.material;

    return item;
  }
}
