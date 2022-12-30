const tests = document.getElementById('tests');

RelativeUrlTestList.forEach(tset => {
  tset.tests.forEach(t => {
    const got = RelativizeUrl.relativize(t.rel, tset.from);
    const tr = document.createElement('tr');
    const rel = document.createElement('td'); rel.innerText = t.rel;
    const base = document.createElement('td'); base.innerText = tset.from;
    const result = document.createElement('td'); result.innerText = got;
    tr.appendChild(rel); tr.appendChild(base); tr.appendChild(result);
    tr.classList.add(got === t.exp ? 'pass' : 'fail');
    tests.appendChild(tr);
  });
});
