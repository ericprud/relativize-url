# relativize-url
Simple (only depends on URL) module to construct relative URLs from target and base URLs.

This is similar to `relateurl` but has no dependency on `url` (note lower-case). The dependency on `url` caused trouble in recent webpack and react so I put together this minimal library function to leverage `URL`'s parsing skillz.

`relativize-url` tiny so feel free to pigeon the code directly from index.js.

## Installation

Like everything else:

``` shell
npm install -S relativize-url
```

## Sample use

``` js
const getRel = require('relativize-url').relativize;
const base = 'http://a.example/b/e/f';
const target = 'http://a.example/b/c/d';
console.log(getRel(target, base));
// got '../c/d'; let's check it:
console.log(new URL('../c/d', base).href === target);
// true
```

The ```__tests__/manifest.js``` file has a list of tests that demo this pretty well.

## relateurl Interface

For folks migrating from relateurl because of the dependency on `url`, you can use the same interface in relativize-url:

```js
const RelativizeUrl = require('relativize-url');
const base = 'http://a.example/b/e/f';
const relater = new RelativizeUrl(base);
const target = 'http://a.example/b/c/d';
console.log(relater.relate(target));
// got '../c/d'; let's check it:
console.log(new URL('../c/d', base).href === target);
// true
```

## version

This is at 0.0.1 (SemVer prohibits negative and imaginary numbers). If I get some feedback on interface and bug fixes, I'll to a propery 1.0 release.
