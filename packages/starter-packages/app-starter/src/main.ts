import { clamp } from "@monorepo/runtime-utils/number";

document.body.textContent = `My app! ${clamp(10, 1, 5)}`;
