import { Room } from "./room";

export class Area {
  id = "";
  name = "";
  description = "";
  
  rooms = new Map<string, Room>();
}