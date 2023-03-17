"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = tsConfigGlob;
function tsConfigGlob(workSpace) {
  return [`${workSpace}/tsconfig.json`, `${workSpace}/tsconfig.*.json`];
}