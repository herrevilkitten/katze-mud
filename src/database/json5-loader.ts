import JSON5 from "json5";
import { readFileSync, readdirSync } from "fs";
import { Area } from "../model/area";
import { Room } from "../model/room";
import { Exit } from "../model/exit";

interface Json5Room {
  name: string;
  description: string;
  exits: { [id: string]: Json5Exit };
}

interface Json5Exit {
  direction: string;
  destination: string;
}

interface Json5Area {
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

  return room;
}

function parseJson5Area(id: string, area5: Json5Area): Area {
  const area = new Area();

  area.id = id;
  area.name = area5.name;
  area.description = area5.description;

  for (const [roomId, room5] of Object.entries(area5.rooms)) {
    const room = parseJson5Room(roomId, room5);
    area.rooms.set(roomId, room);
  }

  return area;
}

export function loadJson5World(path: string): Area[] {
  const areas: Area[] = [];
  const files = readdirSync(path);

  for (const file of files) {
    const id = file.replace(/\.json5$/, "");
    const json5 = JSON5.parse(readFileSync(`${path}/${file}`, "utf8"));

    const area = parseJson5Area(id, json5);
    areas.push(area);
  }

  return areas;
}
