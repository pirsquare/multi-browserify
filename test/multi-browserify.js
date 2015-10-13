var fs = require('fs');
var assert = require("assert");
var test = require("tap").test;
var MultiBrowserify = require('../lib/multi-browserify');


function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
}

var generatedFile = "test/files/bundles/summation.js";

test('Should browserify files', function(t) {
  var opts = {
    indir: 'test/files/entry/',
    outdir: 'test/files/bundles/',
    sourcemaps: true
  }

  assert.equal(fileExists(generatedFile), false);
  var multiBrowserify = new MultiBrowserify(opts);
  multiBrowserify.process();
  assert.equal(fileExists(generatedFile), true);
  t.end()
})


test('teardown', function(t) {
  // cleanup, remove files
  fs.unlinkSync(generatedFile);
  t.end()
});