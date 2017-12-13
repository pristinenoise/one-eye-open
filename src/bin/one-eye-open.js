#!/usr/bin/env node

import { fileWatcher } from "../oneEyeOpen";
import yargs from "yargs";
import fs from "fs";
import path from "path";

const VERSION =
  "one-eye-open: " +
  require("../../package.json").version +
  "\nchokidar: " +
  require("chokidar/package").version;

const argv = yargs
  .usage(
    `Usage: one-eye-open [options]

  one-eye-open currently works by using a config file,
  you can specify this file via the -c option or it'll
  by default look for this file in:
  .one-eye-open, .one-eye-open.js, or .one-eye-open.json

  For information on how to write a .one-eye-open config file,
  please go to https://github.com/pristinenoise/one-eye-open
  `
  )
  .example("one-eye-open -c ./.watcherConfig")
  .option("c", {
    alias: "config",
    describe: `Config file for one-eye-open.`
  })
  .help("h")
  .alias("h", "help")
  .version(VERSION).argv;

function loadConfigFile(filename) {
  console.log(filename);
}

function detectConfigFile(argv) {
  if (argv.c && fs.existsSync(argv.c)) {
    return loadConfigFile(argv.c);
  }

  const placesToCheck = [
    ".one-eye-open",
    ".one-eye-open.js",
    ".one-eye-open.json"
  ];

  const filename = placesToCheck.find(place => {
    return fs.existsSync(path.join(process.cwd(), place));
  });

  if (filename) {
    return loadConfigFile(filename);
  } else {
    console.error(`Config file not found.
      Please add .one-eye-open or specify with -c`);
    process.exit(1);
  }
}

detectConfigFile(argv);
