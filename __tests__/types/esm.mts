import RelativizeUrl, { relativize, RelativizeUrl as Named, type Options } from 'relativize-url';

const opts: Options = {};
const a: string = relativize('http://a.example/b/c/d', 'http://a.example/b/e/f');
const b: string = relativize(new URL('http://a.example/b/c/d'), new URL('http://a.example/b/e/f'), opts);
const relater: Named = new RelativizeUrl('http://a.example/b/e/f');
const c: string = relater.relate('http://a.example/b/c/d');

// @ts-expect-error base is required
relativize('http://a.example/b/c/d');
// @ts-expect-error rel must be a string or URL
relater.relate(42);

export { a, b, c };
