import RelativizeUrl = require('relativize-url');

const opts: RelativizeUrl.Options = {};
const a: string = RelativizeUrl.relativize('http://a.example/b/c/d', 'http://a.example/b/e/f', opts);
const relater: RelativizeUrl = new RelativizeUrl(new URL('http://a.example/b/e/f'));
const b: string = relater.relate(new URL('http://a.example/b/c/d'));

// @ts-expect-error base is required
RelativizeUrl.relativize('http://a.example/b/c/d');
// @ts-expect-error base is readonly
relater.base = 'http://a.example/';
// @ts-expect-error options is readonly
relater.options = {};

export = { a, b };
