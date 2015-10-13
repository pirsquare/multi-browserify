#!/usr/bin/env node

var program = require('commander');
var MultiBrowserify = require('../lib/multi-browserify');

program
  .option('-i, --indir <dir>', 'Input directory')
  .option('-o, --outdir <dir>', 'Output directory')
  .option('-s, --sourcemaps', 'Enable source maps')
  .parse(process.argv);


var opts = {
  indir: program.indir,
  outdir: program.outdir,
  sourcemaps: program.sourcemaps
}

var multiBrowserify = new MultiBrowserify(opts);
multiBrowserify.process();