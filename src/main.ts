import { loadJson5World } from "./database/json5-loader";
import { loadScripts, runScript } from "./database/script-loader";
import { loadYamlWorld } from "./database/yaml-loader";

const path = "database/zones";
const zones = loadYamlWorld(path);
console.log(zones);

const character = zones[0].characters.values().next().value?.instantiate();
console.log(character);
console.log(character?.id);
