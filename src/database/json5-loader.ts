import JSON5 from "json5";
import { readFileSync, readdirSync } from "fs";
import { Zone } from "../model/zone";
import { Room } from "../model/room";
import { Exit } from "../model/exit";

interface Json5Room {
  name: string;
  description: string;
  exits: { [id: string]: Json5Exit };
  extraDescriptions: { [id: string]: string };
}

interface Json5Exit {
  direction: string;
  destination: string;
}

interface Json5Zone {
  id: string;
  name: string;
  description: string;
  rooms: { [id: string]: Json5Room };
}

function parseJson5Exit(id: string, exit5: Json5Exit): Exit {
  const exit = new Exit();
  exit.id = id;
  exit.direction = exit5.direction;
  exit.destination = exit5.destination;

  return exit;
}

function parseJson5Room(id: string, room5: Json5Room): Room {
  const room = new Room();

  room.id = id;
  room.name = room5.name;
  room.description = room5.description;

  for (const [exitId, exit5] of Object.entries(room5.exits)) {
    const exit = parseJson5Exit(exitId, exit5);
    room.exits.set(exitId, exit);
  }

  room.extraDescriptions = new Map(Object.entries(room5.extraDescriptions));

  return room;
}

function parseJson5Zone(id: string, zone5: Json5Zone): Zone {
  const zone = new Zone();

  zone.id = id;
  zone.name = zone5.name;
  zone.description = zone5.description;

  if (zone5.rooms) {
    for (const [roomId, room5] of Object.entries(zone5.rooms)) {
      const room = parseJson5Room(roomId, room5);
      zone.rooms.set(roomId, room);
    }
  }

  return zone;
}

export function loadJson5World(path: string): Zone[] {
  const zones: Zone[] = [];
  const files = readdirSync(path);

  for (const file of files) {
    if (!file.endsWith(".json5")) {
      continue;
    }
    console.log(`Loading ${file}`);
    const id = file.replace(/\.json5$/, "");
    const json5 = JSON5.parse(readFileSync(`${path}/${file}`, "utf8"));

    const zone = parseJson5Zone(id, json5);
    zones.push(zone);
  }

  return zones;
}
