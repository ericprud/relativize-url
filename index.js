class RelativizeUrl {
  static components = [
    {name: 'protocol', write: u => u.protocol },
    {name: 'hostname', write: u => '//' + u.hostname },
    {name: 'port', write: u => u.port === '' ? '' : (':' + u.port) },
    {name: 'pathname', write: (u, frm, relativize) => {
      if (!relativize || u.pathname === '' || frm.pathname === '') return u.pathname;

      const f = frm.pathname.split('/').slice(1);
      const t = u.pathname.split('/').slice(1);
      if (f[0] !== t[0]) return u.pathname;

      let start = 1;
      while(f[start] === t[start]) ++start;
      return f.slice(start+1).map(c => '..').concat(t.slice(start)).join('/');
    }},
    {name: 'search', write: u => u.search },
    {name: 'hash', write: u => u.hash},
  ];

  constructor (base, options) { this.base = base; this.options = options; }

  relate (rel) { return RelativizeUrl.relativize(rel, this.base, this.options); }

  static relativize (rel, base, opts) {
    const from = new URL(base);
    const to = new URL(rel, from);
    let ret = '';
    for (let i = 0; i < RelativizeUrl.components.length; ++i) {
      const component = RelativizeUrl.components[i];
      if (ret) {
        ret += component.write(to, from, false);
      } else {
        const [l, r] = [from[component.name], to[component.name]];
        if (l !== r) {
          ret = component.write(to, from, true);
        }
      }
    }
    return ret;
  }
}

if (typeof require !== "undefined" && typeof exports !== "undefined")
  module.exports = RelativizeUrl;
