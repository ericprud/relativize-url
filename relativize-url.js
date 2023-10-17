class RelativizeUrl {
  static components = [
    {name: 'protocol', write: u => u.protocol },
    {name: 'hostname', write: u => '//' + u.hostname },
    {name: 'port', write: u => ':' + u.port },
    {name: 'pathname', write: (u, frm, relativize) => {
      if (!relativize) return u.pathname;
      const f = frm.pathname.split('/').slice(1);
      const t = u.pathname.split('/').slice(1);
      const maxDepth = Math.max(f.length, t.length);

      let start = 0;
      while(start < maxDepth && f[start] === t[start]) ++start;
      const rel = f.slice(start+1).map(c => '..').concat(t.slice(start === f.length ? start - 1 : start)).join('/');
      return rel.length <= u.pathname.length ? rel : u.pathname
    }},
    {name: 'search', write: u => u.search },
    {name: 'hash', write: u => u.hash},
  ];

  constructor (base, options) { this.base = base; this.options = options; }

  relate (rel) { return RelativizeUrl.relativize(rel, this.base, this.options); }

  static relativize (rel, base, opts = {}) { // opts not yet used
    const from = new URL(base);
    const to = new URL(rel, from);
    let ret = '';
    for (let component of RelativizeUrl.components) {
      if (ret) { // force abs path if e.g. host was diffferent
        if (to[component.name]) {
          ret += component.write(to, from, false);
        }
      } else if (from[component.name] !== to[component.name]) {
        ret = component.write(to, from, true);
      }
    }
    return ret;
  }
}

/* istanbul ignore next */
if (typeof require !== "undefined" && typeof exports !== "undefined")
  module.exports = RelativizeUrl;
