const path = require("path");
const fs = require("fs");
const zlib = require("zlib");
const dirName = hash.slice(0, 2);
const fileName = hash.slice(2);
const objectPath = path.join(".git", "objects", dirName, fileName);

function readTree(hash) {
  if (!fs.existsSync(objectPath)) {
    throw new Error("Object path does not exist");
  }
  const dataFromFile = fs.readFileSync(objectPath);
  const decompressedData = zlib.inflateSync(dataFromFile);
  let dataStr = decompressedData.toString("binary");
  let nullByteIndex = dataStr.indexOf("\0");
  dataStr = dataStr.slice(nullByteIndex + 1);
  const entries = [];
  while (dataStr.length > 0) {
    const spaceIndex = dataStr.indexOf(" ");
    if (spaceIndex === -1) break; // Invalid format
    const mode = dataStr.slice(0, spaceIndex);
    dataStr = dataStr.slice(spaceIndex + 1);
    const nullIndex = dataStr.indexOf("\0");
    if (nullIndex === -1) break; // Invalid format
    const name = dataStr.slice(0, nullIndex);
    if (!name) continue; // skip empty names
    dataStr = dataStr.slice(nullIndex + 1); // Move past the null byte
    const sha = dataStr.slice(0, 20);
    dataStr = dataStr.slice(20);
    entries.push(name);
  }
  const response = entries.join("\n"); // Removed the trailing newline for better handling
  if (response) {
    process.stdout.write(response + "\n"); // Append newline here
  } else {
    throw new Error("No valid entries found");
  }
}
module.exports = readTree;
