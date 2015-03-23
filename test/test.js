'use strict';

var test = require('tape');
var hex = require('../');

test('empty buffer', function(t) {
  t.equal(hex(new Buffer([])), 'Offset   00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F');
  t.end();
});

var head = 'Offset   00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F\n';
test('simple buffer', function(t) {
  t.equal(hex(new Buffer([1,2,3])), head + '000000   01 02 03                                          ...\n');
  t.end();
});

test('ascii output', function(t) {
  t.equal(hex(new Buffer([70,79,79])), head + '000000   46 4F 4F                                          FOO\n');
  t.end();
});

test('string buffer', function(t) {
  t.equal(hex(new Buffer('FOO')),      head + '000000   46 4F 4F                                          FOO\n');
  t.end();
});


test('multi-line output', function(t) {
  t.equal(hex(new Buffer([1,2,3,4,5,7,8,9,10,11,12,14,15,16,17,18,19,20])), head +
      '000000   01 02 03 04 05 07 08 09 0A 0B 0C 0E 0F 10 11 12   ................\n' +
      '000010   13 14                                             ..\n');
  t.end();
});
