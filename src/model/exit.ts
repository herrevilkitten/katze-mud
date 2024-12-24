import { Room } from "./room";

export type Destination = string | Room;

export class Exit {
  id = "";
  name = "";
  description = "";

  direction = "";
  destination: Destination = "";
}
