const fs = require("fs");
const path = require("path");
const { readGitObject } = require("./utils");

function createTree(hash, gitDir, basePath = "") {
  const { type, length, content } = readGitObject(hash, gitDir);
  if (type !== "tree") {
    throw new Error("Not a tree");
  }
  let entries = parseTreeEntries(content);
  for (let entry of entries) {
    if (entry.mode === "100644") {
      const blob = readGitObject(entry.hash, gitDir);
      fs.writeFileSync(path.join(basePath, entry.name), blob.content);
    } else if (entry.mode === "40000") {
      let folder = path.join(basePath, entry.name);
      fs.mkdirSync(folder);
      createTree(entry.hash, gitDir, folder);
    }
  }
}

function parseTreeEntries(data) {
  const result = [];
  let startIndex = 0;

  while (startIndex < data.length) {
    const modeEndIndex = data.indexOf(" ", startIndex);
    if (modeEndIndex === -1) break; // Exit loop if delimiter not found
    const mode = data.slice(startIndex, modeEndIndex).toString();

    const fileNameStartIndex = modeEndIndex + 1;
    const nullByteIndex = data.indexOf("\0", fileNameStartIndex);
    if (nullByteIndex === -1) break; // Exit loop if delimiter not found
    const name = data.slice(fileNameStartIndex, nullByteIndex).toString();

    const hashStartIndex = nullByteIndex + 1;
    const hashEndIndex = hashStartIndex + 20;
    const hash = data.slice(hashStartIndex, hashEndIndex).toString("hex");

    result.push({ mode, name, hash });

    startIndex = hashEndIndex;
  }

  return result;
}

module.exports = createTree;
