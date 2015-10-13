# multi-browserify
[![Build Status](https://travis-ci.org/pirsquare/multi-browserify.svg?branch=master)](https://travis-ci.org/pirsquare/multi-browserify)

Run browserify on multiple files.

Sometimes you have multiple entry points for your app and you want to browserified all of them at one go. [Factor-bundle](https://github.com/substack/factor-bundle) works nicely when you have a few entry point files to browserified but what if you have several files?

[Multi-Browserify](https://github.com/pirsquare/multi-browserify) solves this by taking a specified input directory containing all your entry point files and browserified them to a specified output directory.


## Installation

    npm install multi-browserify

## Examples
Say all your entry point files are stored in `/js/entry/` and you want to output the browserified files to `/js/bundles/`
```shell
multi-browserify -i /js/entry/ -o /js/bundles/

# add -s if you want sourcemaps
multi-browserify -i /js/entry/ -o /js/bundles/ -s
```

## Subdirectories
Multi-Browserify supports entry point files in subdirectories. Say you have entry point in `/js/entry/subdir1/subdir2/a.js` running `multi-browserify -i /js/entry/ -o /js/bundles/` will output file to `/js/bundles/subdir1/subdir2/a.js`


## Testing

    npm test