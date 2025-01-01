import { Exit } from "./exit";

export class Room {
  id = "";
  name = "";
  description = "";

  exits = new Map<string, Exit>();
  extraDescriptions = new Map<string, string>();
}
