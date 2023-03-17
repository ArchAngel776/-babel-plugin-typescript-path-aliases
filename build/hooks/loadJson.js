"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = jsonMap;
var _fs = require("fs");
function jsonMap(path) {
  const json = (0, _fs.readFileSync)(path, "utf-8");
  return JSON.parse(json);
}