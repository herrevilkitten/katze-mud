import { loadJson5World } from "./database/json5-loader";

const path = "database/areas";
const areas = loadJson5World(path);
console.log(areas);
