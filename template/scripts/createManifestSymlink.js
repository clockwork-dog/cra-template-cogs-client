#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const originalFile = path.join(__dirname, "..", "src", "cogs-plugin-manifest.js");
const symlinkToCreate = path.join("..", "public", "cogs-plugin-manifest.js");

// On Windows we need to use an absolute path to create the "junction" link as a non-admin user
// so we create a junction using the absolute path
if (process.platform === "win32") {
  fs.link(originalFile, path.resolve(__dirname, symlinkToCreate), (error) => {
    if (error) {
      throw error;
    }
    console.log("Created hard link:", originalFile, "->", symlinkToCreate);
  });
} else {
  fs.symlink(originalFile, symlinkToCreate, (error) => {
    if (error) {
      throw error;
    }
    console.log("Created symlink:", originalFile, "->", symlinkToCreate);
  });
}
