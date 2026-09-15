# relativize-url
Simple (only depends on `URL`) module to construct relative URLs from target and base URLs.

This is similar to [`relateurl`](https://www.npmjs.com/package/relateurl) but has no dependency on [`url`](https://www.npmjs.com/package/url) (note lower-case). The dependency on `url` caused trouble in recent webpack and react so I put together this minimal library function to leverage `URL`'s parsing skillz.

## Installation

Like everything else:

``` shell
npm install -S relativize-url
```

## Sample use

``` js
const { relativize } = require('relativize-url');
const base = 'http://a.example/b/e/f';
const target = 'http://a.example/b/c/d';
console.log(relativize(target, base));
// got '../c/d'; let's check it:
console.log(new URL('../c/d', base).href === target);
// true
```
Note that the the relative URL is calculated by `URL` (all caps), which canonicalizes the protocol and domain name (but not %-encoded characters).

``` js
relativize("HTTP://B.example:80/%61", "ftp://a.example/")
'http://b.example/%61'
```

The [`__tests__/manifest.js`](https://github.com/ericprud/relativize-url/blob/main/__tests__/manifest.js) file has a list of tests that demo this pretty well.

## Ways to load it

The package has two files with the same code:

| file | format | used by |
|---|---|---|
| `relativize-url.mjs` | ES module | `import`, `<script type="module">` |
| `relativize-url.js` | CommonJS / classic script | `require`, plain `<script src>` |

Node and bundlers pick the right one for you when you use the package name. **In a browser, you pick the file yourself, and the two aren't interchangeable:** a plain `<script src>` needs `.js`, and `<script type="module">` needs `.mjs`.

### Node or a bundler: `require` (CommonJS)

``` js
const RelativizeUrl = require('relativize-url');
const { relativize } = RelativizeUrl;
```

### Node or a bundler: `import` (ES module)

``` js
import RelativizeUrl, { relativize } from 'relativize-url';
```

Only the package name is supported; paths inside the package like `relativize-url/relativize-url` are not importable.

### TypeScript

Type declarations are included for both `import` and `require` (no `@types` package needed).

``` ts
import { relativize, type Options } from 'relativize-url';
const rel: string = relativize(new URL('http://a.example/b/c/d'), 'http://a.example/b/e/f');
```

``` ts
import RelativizeUrl = require('relativize-url');
const relater: RelativizeUrl = new RelativizeUrl('http://a.example/b/e/f');
```

### Browser: plain `<script src>` → `relativize-url.js`

This defines a global `RelativizeUrl`:

``` html
<script src="https://cdn.jsdelivr.net/npm/relativize-url@1/relativize-url.js"></script>
<script>
  console.log(RelativizeUrl.relativize('http://a.example/b/c/d', 'http://a.example/b/e/f'));
</script>
```

### Browser: `<script type="module">` → `relativize-url.mjs`

Note the **`.mjs`**; importing `relativize-url.js` here fails because it has no ES exports.

``` html
<script type="module">
  import { relativize } from 'https://cdn.jsdelivr.net/npm/relativize-url@1/relativize-url.mjs';
  console.log(relativize('http://a.example/b/c/d', 'http://a.example/b/e/f'));
</script>
```

### Copy the code

`relativize-url` is tiny so feel free to pigeon the code directly from [relativize-url.mjs](https://github.com/ericprud/relativize-url/blob/main/relativize-url.mjs) (ES module) or [relativize-url.js](https://github.com/ericprud/relativize-url/blob/main/relativize-url.js) (CommonJS / classic script).

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

## Version

This is 1.0. The public interface is what's documented above: the `relativize` function, the `RelativizeUrl` class with `relate`, and the entry points under [Ways to load it](#ways-to-load-it). It follows [SemVer](https://semver.org/), so breaking changes to that interface will only come in a new major version.

## Development

Edit `relativize-url.mjs`; `relativize-url.js` is generated from it by `npm run build` (which `npm test` runs first). CI fails if the committed `relativize-url.js` is out of date.

## Releasing

Pushing a `v*` tag makes GitHub Actions run the tests and publish to npm (`.github/workflows/release.yml`).

``` shell
git checkout main && git pull            # start from an up-to-date, clean main
npm test                                 # also regenerates relativize-url.js from relativize-url.mjs
git status                               # commit anything outstanding (incl. a regenerated relativize-url.js)
npm version patch                        # or minor / major / 1.2.3; bumps package.json + lock, commits, tags vX.Y.Z
git push --follow-tags                   # pushes the commit and the tag; the tag triggers the publish
```

Then watch the "Release" run in the repo's Actions tab and check `npm view relativize-url version`.
