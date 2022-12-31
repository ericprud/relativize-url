const RelativizeUrl = require('../relativize-url');
const RelativeUrlTestList = require('./manifest');

describe('manifest tests', () => {
  RelativeUrlTestList.forEach(tset => {
    describe(tset.from, () => {
      tset.tests.forEach(t => {
        test(t.rel, () => {
          const got = RelativizeUrl.relativize(t.rel, tset.from);
          expect(got).toBe(t.exp);
        });
      });
    });
  });
});

describe('using new a la relateurl', () => {
  RelativeUrlTestList.forEach(tset => {
    describe(tset.from, () => {
      const relateUrl = new RelativizeUrl(tset.from);
      tset.tests.forEach(t => {
        test(t.rel, () => {
          const got = relateUrl.relate(t.rel);
          expect(got).toBe(t.exp);
        });
      });
    });
  });
});
