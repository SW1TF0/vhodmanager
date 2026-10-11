// Lists the configuration values that still need real company details.
import { site } from '../src/config.mjs';

const found = [];
(function walk(value, path) {
  if (typeof value === 'string' && value.startsWith('[TODO')) found.push(`${path}: ${value}`);
  else if (value && typeof value === 'object') for (const [k, v] of Object.entries(value)) walk(v, path ? `${path}.${k}` : k);
})(site, '');

if (found.length) {
  console.log(`${found.length} placeholder(s) left in src/config.mjs:\n`);
  console.log(found.map((f) => `  - ${f}`).join('\n'));
} else {
  console.log('No placeholders left.');
}
