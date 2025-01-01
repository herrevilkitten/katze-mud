import { readFileSync, readdirSync } from "fs";
import { basename } from "path";
import { Zone } from "../model/zone";
import { Room } from "../model/room";
import { Item } from "../model/item";
import { Character } from "../model/character";

const scripts = new Map<string, string[]>();

interface ScriptState {
  currentZone?: Zone;
  currentRoom?: Room;
  currentMobile?: Character;
  currentItem?: Item;
}

export function runScript(scriptId: string) {
  const script = scripts.get(scriptId);
  if (!script) {
    throw new Error(`Script ${scriptId} not found`);
  }

  const state: ScriptState = {};

  for (const line of script) {
    console.log(line);
  }
}
/*
in mud-school:classroom
  on reset
    add mobile teacher
      add item attendance-book
    add mobile student
in mud-school:entrance
  on reset
    add mobile guard
      add item standard:longsword in mainhand
      add item standard:small-buckler in offhand
      add item standard:copper-breastplate in chest
*/

export function loadScript(path: string) {
  const scriptId = basename(path, ".script");
  const script = readFileSync(path, "utf8");
  const lines = script.split("\n");
  scripts.set(scriptId, lines);
}

export function loadScripts(path: string) {
  const files = readdirSync(path);
  for (const file of files) {
    if (!file.endsWith(".script")) {
      continue;
    }
    console.log(`Loading script ${file}`);
    loadScript(`${path}/${file}`);
  }
  return scripts;
}
