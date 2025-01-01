import { readdirSync, readFileSync } from "fs";
import { parse } from "yaml";
import { DEFAULT_RESET_INTERVAL, Zone } from "../model/zone";
import { Room } from "../model/room";
import { Exit } from "../model/exit";
import {
  Character,
  CharacterPrototype,
  DEFAULT_ABILITY_SCORE,
} from "../model/character";
import parseDuration from "parse-duration";
import { Dice } from "../model/dice";

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
  health: string;
  mana: string;
  stamina: string;
  strength: string;
  dexterity: string;
  constitution: string;
  intelligence: string;
  wisdom: string;
  charisma: string;
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

function parseYamlCharacter(zone: Zone, yaml: YamlCharacter) {
  const mobile = new CharacterPrototype(zone);

  mobile.prototypeId = yaml.id;
  console.log(`Parsing mobile ${mobile.id}`);
  mobile.name = yaml.name;
  mobile.description = yaml.description;

  mobile.health = Dice.fromString(yaml.health ?? "1");
  mobile.mana = Dice.fromString(yaml.mana ?? "1");
  mobile.stamina = Dice.fromString(yaml.stamina ?? "1");

  mobile.strength = Dice.fromString(yaml.strength ?? DEFAULT_ABILITY_SCORE);
  mobile.dexterity = Dice.fromString(yaml.dexterity ?? DEFAULT_ABILITY_SCORE);
  mobile.constitution = Dice.fromString(
    yaml.constitution ?? DEFAULT_ABILITY_SCORE
  );
  mobile.intelligence = Dice.fromString(
    yaml.intelligence ?? DEFAULT_ABILITY_SCORE
  );
  mobile.wisdom = Dice.fromString(yaml.wisdom ?? DEFAULT_ABILITY_SCORE);
  mobile.charisma = Dice.fromString(yaml.charisma ?? DEFAULT_ABILITY_SCORE);

  return mobile;
}

function parseYamlRoom(zone: Zone, yaml: YamlRoom) {
  const room = new Room(zone);

  room.prototypeId = yaml.id;
  console.log(`Parsing room ${room.id}`);
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
  console.log(`Parsing zone ${zone.id}`);
  zone.name = yaml.name;
  zone.description = yaml.description;
  zone.resetInterval =
    parseDuration(yaml.resetInterval ?? "90s", "ms") ?? DEFAULT_RESET_INTERVAL;

  for (const yamlRoom of yaml.rooms ?? []) {
    const room = parseYamlRoom(zone, yamlRoom);
    zone.rooms.set(room.id, room);
  }

  for (const yamlCharacter of yaml.mobiles ?? []) {
    const character = parseYamlCharacter(zone, yamlCharacter);
    zone.characters.set(character.id, character);
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

    const zone = parseYamlZone(yaml);
    zones.push(zone);
  }

  return zones;
}
