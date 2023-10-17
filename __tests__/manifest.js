RelativeUrlTestList = [
  { // relateurl demo
    from: 'http://example.com/dir0/dir1/dir1-1/file?a=b#frag',
    tests: [
      {rel: 'file2', exp: 'file2'},
      {rel: '../file2', exp: '../file2'},
      {rel: '../dir1-2', exp: '../dir1-2'},
      {rel: '../dir1-2/', exp: '../dir1-2/'},
      {rel: '../dir1-2/file2', exp: '../dir1-2/file2'},
      {rel: '/dir0/dir2/dir2-1/', exp: '../../dir2/dir2-1/'},
      {rel: '../../dir2/dir2-1/', exp: '../../dir2/dir2-1/'},
      {rel: '/dir2/dir2-1/', exp: '/dir2/dir2-1/'},
      {rel: '../../../dir2/dir2-1/', exp: '/dir2/dir2-1/'},
      {rel: '../../../../dir2/dir2-1/', exp: '/dir2/dir2-1/'},
      {rel: '?c=d#frag2', exp: '?c=d#frag2'},
      {rel: '?a=b#frag2', exp: '#frag2'},
      {rel: '#', exp: ''},
      {rel: 'file', exp: ''},
      {rel: '', exp: ''},
      {rel: '//google.com:80/dir/', exp: '//google.com/dir/'},
      {rel: 'https://example.com:1234/dir0/dir1/dir1-1/', exp: 'https://example.com:1234/dir0/dir1/dir1-1/'},
      {rel: '../../../../../../../../#anchor', exp: '/#anchor'},
      {rel: 'tag:example.com,2004:1234', exp: 'tag:example.com,2004:1234'},
    ]
  },
  { // relateurl demo with different port
    from: 'http://example.com:1234/dir0/dir1/dir1-1/file',
    tests: [
      {rel: 'file2', exp: 'file2'},
      {rel: 'file/more-file', exp: 'file/more-file'}, // file wasn't really a file, but instead a dir with no trailing '/'
      {rel: 'file/still/more/file', exp: 'file/still/more/file'}, // file wasn't really a file, but instead a dir with no trailing '/'
      {rel: '../file2', exp: '../file2'},
      {rel: '../dir1-2', exp: '../dir1-2'},
      {rel: '../dir1-2/', exp: '../dir1-2/'},
      {rel: '../dir1-2/file2', exp: '../dir1-2/file2'},
      {rel: '/dir2/dir2-1/', exp: '/dir2/dir2-1/'},
      {rel: '', exp: ''},
      {rel: '//google.com:80/dir/', exp: '//google.com/dir/'},
      {rel: 'https://example.com:1234/dir0/dir1/dir1-1/', exp: 'https://example.com:1234/dir0/dir1/dir1-1/'},
      {rel: '../../../../../../../../#anchor', exp: '/#anchor'},
    ]
  },
  { // relateurl demo with base with dir path
    from: 'http://example.com/dir0/dir1/dir1-1/',
    tests: [
      {rel: 'file2', exp: 'file2'},
      {rel: '../file2', exp: '../file2'},
      {rel: '../dir1-2', exp: '../dir1-2'},
      {rel: '../dir1-2/', exp: '../dir1-2/'},
      {rel: '../dir1-2/file2', exp: '../dir1-2/file2'},
      {rel: '/dir2/dir2-1/', exp: '/dir2/dir2-1/'},
      {rel: '', exp: ''},
      {rel: '//google.com:80/dir/', exp: '//google.com/dir/'},
      {rel: 'https://example.com:1234/dir0/dir1/dir1-1/', exp: 'https://example.com:1234/dir0/dir1/dir1-1/'},
      {rel: '../../../../../../../../#anchor', exp: '/#anchor'},
    ]
  },
  { // relateurl demo with base with root path
    from: 'http://example.com/',
    tests: [
      {rel: 'file2', exp: 'file2'},
      {rel: '../file2', exp: 'file2'},
      {rel: '../dir1-2', exp: 'dir1-2'},
      {rel: '../dir1-2/', exp: 'dir1-2/'},
      {rel: '../dir1-2/file2', exp: 'dir1-2/file2'},
      {rel: '/dir2/dir2-1/', exp: 'dir2/dir2-1/'},
      {rel: '', exp: ''},
      {rel: '//google.com:80/dir/', exp: '//google.com/dir/'},
      {rel: 'https://example.com:1234/dir0/dir1/dir1-1/', exp: 'https://example.com:1234/dir0/dir1/dir1-1/'},
      {rel: '../../../../../../../../#anchor', exp: '#anchor'},
    ]
  },
  { // relateurl demo with base with empty path
    from: 'http://example.com',
    tests: [
      {rel: 'file2', exp: 'file2'},
      {rel: '../file2', exp: 'file2'},
      {rel: '../dir1-2', exp: 'dir1-2'},
      {rel: '../dir1-2/', exp: 'dir1-2/'},
      {rel: '../dir1-2/file2', exp: 'dir1-2/file2'},
      {rel: '/dir2/dir2-1/', exp: 'dir2/dir2-1/'},
      {rel: '', exp: ''},
      {rel: '//google.com:80/dir/', exp: '//google.com/dir/'},
      {rel: 'https://example.com:1234/dir0/dir1/dir1-1/', exp: 'https://example.com:1234/dir0/dir1/dir1-1/'},
      {rel: '../../../../../../../../#anchor', exp: '#anchor'},
    ]
  },
  { // http://www.eg.bucknell.edu/~xmeng/test/relative-urls.html
    from: 'http://www.bucknell.edu/home/dir/level3/file.html',
    tests: [
      {rel: '', exp: ''},
      {rel: 'http://www.bucknell.edu/home/dir/level3/file.html', exp: ''},
      {rel: '//cnn.com:90//testpages/grading.html', exp: '//cnn.com:90//testpages/grading.html'},
      {rel: '//cnn.com:80//testpages/grading.html', exp: '//cnn.com//testpages/grading.html'},
      {rel: '//cnn.com/level0/./testpages/../level1/lelve2/../../grading.html', exp: '//cnn.com/level0/grading.html'},
      {rel: '../testpages/level2/../level3/grading.html', exp: '../testpages/level3/grading.html'},
      {rel: '../testpages/level2/../level3/.././grading.html#abc', exp: '../testpages/grading.html#abc'},
      {rel: '../grading.html#abc', exp: '../grading.html#abc'},
      {rel: 'grading.html#abc', exp: 'grading.html#abc'},
      {rel: '/grading.html#abc', exp: '/grading.html#abc'},
      {rel: '../testpages/level1/level2/../level3/grading.html', exp: '../testpages/level1/level3/grading.html'},
    ]
  },
  { // relateurl demo
    from: 'http://example.com/dir0/dir1/dir1-1/file',
    tests: [
      {rel: 'file2', exp: 'file2'},
      {rel: '../file2', exp: '../file2'},
      {rel: '../dir1-2', exp: '../dir1-2'},
      {rel: '../dir1-2/', exp: '../dir1-2/'},
      {rel: '../dir1-2/file2', exp: '../dir1-2/file2'},
      {rel: '/dir2/dir2-1/', exp: '/dir2/dir2-1/'},
      {rel: '', exp: ''},
      {rel: '//google.com:80/dir/', exp: '//google.com/dir/'},
      {rel: 'https://example.com:1234/dir0/dir1/dir1-1/', exp: 'https://example.com:1234/dir0/dir1/dir1-1/'},
      {rel: '../../../../../../../../#anchor', exp: '/#anchor'},
    ]
  },
];

if (typeof require !== "undefined" && typeof exports !== "undefined")
  module.exports = RelativeUrlTestList;
