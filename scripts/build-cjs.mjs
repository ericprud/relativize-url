// Generate relativize-url.js (CommonJS + classic <script>) from relativize-url.mjs (ES module).
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const src = fileURLToPath(new URL('../relativize-url.mjs', import.meta.url));
const dst = fileURLToPath(new URL('../relativize-url.js', import.meta.url));

const body = readFileSync(src, 'utf8')
  .replace(/^\/\/ Single-line exports only;.*\n/m, '')
  .replace(/^export\b.*\n?/gm, '')
  .trimEnd();

if (/^\s*(import|export)\b/m.test(body))
  throw new Error(`${src}: unexpected import/export left after stripping; keep exports on single trailing lines`);

const out = `// GENERATED from relativize-url.mjs by scripts/build-cjs.mjs -- edit that file instead.
${body}

/* istanbul ignore next */
if (typeof require !== "undefined" && typeof exports !== "undefined")
  module.exports = RelativizeUrl;
`;

writeFileSync(dst, out);
