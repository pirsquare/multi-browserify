#!/usr/bin/env node

var fs = require("fs");
var path = require("path");
var browserify = require('browserify');
var mksubdir = require('mksubdir');


function MultiBrowserify(opts) {
  if (!(this instanceof MultiBrowserify)) {
    throw new TypeError("MultiBrowserify constructor cannot be called as a function.");
  }

  if (!opts.indir) {
    throw new Error("Missing/Empty args input directory [indir]");
  }

  if (!opts.outdir) {
    throw new Error("Missing/Empty args ouput directory [outdir]");
  }


  this.indir = path.normalize(opts.indir);
  this.outdir = path.normalize(opts.outdir);
  this.sourcemaps = opts.sourcemaps;
  this.validExt = ['.js'];
}


MultiBrowserify.prototype = {
  constructor: MultiBrowserify,

  opts: function() {
    return {
      indir: this.indir,
      outdir: this.outdir,
      sourcemaps: this.sourcemaps,
      validExt: this.validExt
    }
  },

  // Walk through files in directory and run callback function.
  walk: function(currentDirPath, callback) {
    var self = this;

    fs.readdirSync(currentDirPath).forEach(function(name) {
      var filePath = path.join(currentDirPath, name);
      var stat = fs.statSync(filePath);
      if (stat.isFile()) {
        callback(filePath, self.opts());
      } else if (stat.isDirectory()) {
        self.walk(filePath, callback);
      }
    });
  },

  process: function() {
    this.walk(this.indir, browserified);
  }
};


function browserified(filePath, opts) {
  if (opts.validExt.indexOf(path.extname(filePath)) === -1) {
    console.log("Skipping invalid file extension: " + filePath +
      "\nAccepted extension: " + opts.validExt.join(", "));
    return
  }

  var browserifyOpts = {};
  if (opts.sourcemaps) {
    browserifyOpts.debug = true;
  }

  var b = browserify(filePath, browserifyOpts);
  var newPath = path.join(opts.outdir, filePath.replace(opts.indir, ""));
  mksubdir(path.dirname(newPath));
  b.bundle().pipe(fs.createWriteStream(newPath));
};


module.exports = MultiBrowserify;