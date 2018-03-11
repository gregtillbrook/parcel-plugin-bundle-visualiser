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
The next time you run your parcel build a bundle report will be saved to `<project root>/report.html`


# Release Notes
 - 0.2 Initial POC 
 - 0.8 Added onhover toolip showing stats (dont expect these reports to be viewed on touch devices - if thats incorrect then let me know). Also added gzip size estimate for bundles.


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
