import { badge } from "./funcs/badge";
import { image } from "./funcs/image";
import { noindex } from "./funcs/noindex";

// @ts-expect-error
import "./index.css";

window.addEventListener("load", () => {
  badge();
  image();
});

noindex();
