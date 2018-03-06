# parcel-plugin-bundle-visualiser

A plugin for the [Parcel bundler](https://parceljs.org/) to visualise bundle contents.

![Screenshot showing treemap of a bundle](/docs/bundle-report-example.png?raw=true)

This plugin aims to make it easier to visualise a bundles contents and aid in troubleshooting and optimisation. If you know [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer/) then this plugin will be very familiar. Bundle contents is presented in a treemap that gives eash asset/folder an area relative to its size on disc.  

Note: This is the first release of parcel-plugin-bundle-visualiser - it's just a basic MVP and there's plenty more I want to do but it should still be useful in its current form.


# Install

```console
npm install --save-dev parcel-plugin-bundle-visualiser
```
The next time you run your parcel build a bundle report will be saved 


# Still TODO
 - Show details for assets on mouse hover
 - Some unit tests
 - Config to choose the name and output folder of the report
 - Command line arg for parcel so it's possible to generate report only when required


# Credits
 - [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer/) - this plugin takes heavy inspiration from it and wouldnt exist without it
 - [Parcel](https://parceljs.org/) - A nice alternative bundler for when you dont need/want lots of configuration