# parcel-plugin-bundle-visualiser

A plugin for the [Parcel bundler](https://parceljs.org/) to visualise bundle contents.

[![NPM Version][npm-image]][npm-url]
[![Linux CI Build][travis-image]][travis-url]
[![Windows CI Build][appveyor-image]][appveyor-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]

![Screenshot showing treemap of a bundle](/docs/bundle-report-example.png?raw=true)

This plugin aims to make it easier to visualise a bundles contents and aid in troubleshooting and optimisation. If you know [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer/) then this plugin will be very familiar. Bundle contents is presented in a treemap that gives eash asset/folder an area relative to its size on disc.


# Install

```bash
npm install --save-dev parcel-plugin-bundle-visualiser
```

# Usage

The next time you run your parcel build in production mode (i.e. when NODE_ENV is 'production') a bundle report will be saved to `<output directory>/report.html`


# Interpreting results
When you open the `<output directory>/report.html` in a browser you'll see a treemap that shows the contents of each bundle that parcel created in the last build. The area an asset takes up on screen is relative to the size of the asset (after any minification but before gzipping). Hover over treemap to see further details;
 - The current bundle/folder or asset file name
 - The path relative to the project root
 - The size of the asset (after any minification but before gzipping)
 - Bundles will also have an estimated gzip size. This is meant as a indicator (actual compression size will depend on your settings when serving the bundle)
 - Time taken to bundle. Not sure this is very useful but leaving it in for now - parcel bundles in parallel so actual total times will be much lower than the simple sums shown here.


# Release Notes
 - 1.2.0 Save report to Parcel output directory
 - 1.1.2 Fixed script error in 
 - 1.1.1 Report will now only be generated when NODE_ENV=production
 - 1.0.2 Removed '--visualise' cli arg until until bug [#6](https://github.com/gregtillbrook/parcel-plugin-bundle-visualiser/issues/6) is resolved
 - 1.0.1 Minor readme tweaks
 - 1.0 Required the passing of arg '--visualise' to parcel build command so that user can dictate when report is generated. Hence incremented major npm version as this is a breaking api change.
 - 0.8 Added onhover toolip showing stats (I dont expect these reports to be viewed on touch devices - if thats incorrect then let me know). Also added gzip size estimate for bundles.
 - 0.2 Initial POC 


# Contributing
Contribution is welcome to this project. If you have feedback or suggestion then you can add an issue (please do check for duplicates first). If you have a bug fix or minor improvement then see the steps below and have at it. If you intend a more meaty change it's best to raise an issue first to discuss whats planned.
 - Create a fork from this repo in the usual way
 - Make your intended changes and verify they're good 
 - Add unit tests for any new functionality
 - Run `npm test` to ensure code lints and units tests pass (you'll need to run `npm install` before hand, the first time round)
 - Raise a pull request back to this repo


# Credits
 - [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer/) - This plugin takes heavy inspiration from it and wouldnt exist without it.
 - [Parcel](https://parceljs.org/) - A nice alternative bundler for when you dont need/want lots of configuration.


[npm-image]: https://img.shields.io/npm/v/parcel-plugin-bundle-visualiser.svg
[npm-url]: https://npmjs.org/package/parcel-plugin-bundle-visualiser
[travis-image]: https://img.shields.io/travis/gregtillbrook/parcel-plugin-bundle-visualiser/master.svg?label=Linux%20CI%20Build
[travis-url]: https://travis-ci.org/gregtillbrook/parcel-plugin-bundle-visualiser
[appveyor-image]: https://img.shields.io/appveyor/ci/gregtillbrook/parcel-plugin-bundle-visualiser/master.svg?label=Windows%20CI%20Build
[appveyor-url]: https://ci.appveyor.com/project/gregtillbrook/parcel-plugin-bundle-visualiser
[snyk-image]: https://snyk.io/test/github/gregtillbrook/parcel-plugin-bundle-visualiser/badge.svg
[snyk-url]: https://snyk.io/test/github/gregtillbrook/parcel-plugin-bundle-visualiser
