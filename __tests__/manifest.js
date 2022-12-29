RelativeUrlTestList = [
{
  from: 'http://example.com:1234/dir0/dir1/dir1-1/file',
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
}
];

if (typeof require !== "undefined" && typeof exports !== "undefined")
  module.exports = RelativeUrlTestList;
