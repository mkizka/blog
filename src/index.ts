import { badge } from "./funcs/badge";
import { image } from "./funcs/image";
import { noindex } from "./funcs/noindex";
import "./index.css";

window.addEventListener("load", () => {
  badge();
  image();
});

noindex();
