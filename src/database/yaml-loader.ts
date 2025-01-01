import { readdirSync, readFileSync } from "fs";
import { parse } from "yaml";
import { DEFAULT_RESET_INTERVAL, Zone } from "../model/zone";
import { Room } from "../model/room";
import { Exit } from "../model/exit";
import { Character } from "../model/character";
import parseDuration from "parse-duration";

interface YamlExtraDescription {
  id: string;
  description: string;
}

interface YamlRoom {
  id: string;
  name: string;
  description: string;
  exits: YamlExit[];
  extraDescriptions: YamlExtraDescription[];
}

interface YamlExit {
  direction: string;
  description: string;
  destination: string;
}

interface YamlItem {
  id: string;
  name: string;
  description: string;
  material: string;
}

interface YamlCharacter {
  id: string;
  name: string;
  description: string;
  health: number | string;
  mana: number | string;
  stamina: number | string;
}

interface YamlBroadcastReset {
  to?: string;
  message: string;
}

interface YamlCreateMobileReset {
  mobile: string;
  to: string;
  message?: string;
}

type YamlReset = YamlBroadcastReset | YamlCreateMobileReset;

interface YamlZone {
  id: string;
  name: string;
  description: string;
  resetInterval?: string;
  onReset?: YamlReset[];
  rooms?: YamlRoom[];
  items?: YamlItem[];
  mobiles?: YamlCharacter[];
}

function parseYamlCharacter(yaml: YamlCharacter) {
  const mobile = new Character();

  mobile.id = yaml.id;
  mobile.name = yaml.name;
  mobile.description = yaml.description;
  /*
  mobile.health = yaml.health;
  mobile.mana = yaml.mana;
  mobile.stamina = yaml.stamina;
*/
  return mobile;
}

function parseYamlRoom(yaml: YamlRoom) {
  const room = new Room();

  room.id = yaml.id;
  room.name = yaml.name;
  room.description = yaml.description;

  for (const yamlExit of yaml.exits ?? []) {
    const exit = new Exit();
    exit.direction = yamlExit.direction;
    exit.description = yamlExit.description;
    exit.destination = yamlExit.destination;
    room.exits.set(exit.direction, exit);
  }

  for (const yamlExtraDescription of yaml.extraDescriptions ?? []) {
    room.extraDescriptions.set(
      yamlExtraDescription.id,
      yamlExtraDescription.description
    );
  }

  return room;
}

function parseYamlZone(yaml: YamlZone) {
  const zone = new Zone();

  zone.id = yaml.id;
  zone.name = yaml.name;
  zone.description = yaml.description;
  zone.resetInterval =
    parseDuration(yaml.resetInterval ?? "90s", "ms") ?? DEFAULT_RESET_INTERVAL;

  for (const yamlRoom of yaml.rooms ?? []) {
    const room = parseYamlRoom(yamlRoom);
    zone.rooms.set(room.id, room);
  }

  return zone;
}

export function loadYamlWorld(path: string): Zone[] {
  const zones: Zone[] = [];
  const files = readdirSync(path);

  for (const file of files) {
    if (!file.endsWith(".yaml")) {
      continue;
    }
    console.log(`Loading ${file}`);
    const id = file.replace(/\.json5$/, "");
    const yaml: YamlZone = parse(readFileSync(`${path}/${file}`, "utf8"));
    console.log(yaml);

    const zone = parseYamlZone(yaml);
    zones.push(zone);
  }

  return zones;
}
