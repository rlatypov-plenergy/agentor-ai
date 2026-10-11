import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";

const slugMap = {
  atlanta: "atlanta-construction-voice-agent",
  fitstepper: "fitstepper-smart-stepper",
  himaster: "hi-master-ai-saas",
  ioss: "ioss-hse-incidents",
  patent: "patent-ai",
  personal_assistant: "ai-personal-assistant",
  tenderiq: "tenderiq-tender-ai",
  viber_airpa: "airpa-viber-lead-engine",
  yotta: "yotta-wallet-ai-sdr",
};

const src = "assets-source/mockups";
for (const file of await readdir(src)) {
  if (!file.endsWith(".jpg")) continue;
  const key = Object.keys(slugMap).find((k) => file.startsWith(k + "_"));
  if (!key) continue;
  const out = path.join("public/cases", slugMap[key]);
  await mkdir(out, { recursive: true });
  const name = file.replace(/^.*?_(\d\d)_.*$/, "$1") + ".webp";
  await sharp(path.join(src, file)).resize({ width: 1600 }).webp({ quality: 80 }).toFile(path.join(out, name));
  console.log(out, name);
}

await mkdir("public/team", { recursive: true });
await sharp("assets-source/founder-original.jpg").resize(640).webp({ quality: 85 }).toFile("public/team/roman-latypov.webp");
