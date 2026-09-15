// Run with `node --test`; exercises the ESM entry point via the package's own "exports".
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import RelativizeUrl, { relativize, RelativizeUrl as Named } from 'relativize-url';

const RelativeUrlTestList = createRequire(import.meta.url)('./manifest.js');

test('default and named exports are the same class', () => {
  assert.equal(Named, RelativizeUrl);
  assert.equal(relativize, RelativizeUrl.relativize);
});

RelativeUrlTestList.forEach(tset => {
  const relater = new RelativizeUrl(tset.from);
  tset.tests.forEach(t => {
    test(`${tset.from} ${t.rel}`, () => {
      assert.equal(relativize(t.rel, tset.from), t.exp);
      assert.equal(relater.relate(t.rel), t.exp);
    });
  });
});
