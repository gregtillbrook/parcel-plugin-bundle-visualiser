//simple dev helper to create a report without having to setup a parcel build
const EventEmitter = require('events');
const parcelPluginBundleVisualiser = require('../src/index');

const mockBundle = {
  childBundles: new Set([
    {  
      name:'preview/pretend-bundles/index.js',
      totalSize:400,
      bundleTime:200,
      childBundles: new Set(),
      assets:new Set([
        {
          name:'module/folder1/asset1',
          bundledSize:120,
          buildTime:20
        },
        {
          name:'module/folder1/asset2',
          bundledSize:100,
          buildTime:2
        }
      ])
    },
    {  
      name:'preview/pretend-bundles/index.css',
      totalSize:300,
      bundleTime:200,
      childBundles: new Set(),
      assets:new Set([
        {
          name:'module/folder1/asset2',
          bundledSize:100,
          buildTime:2500
        }
      ])
    }
  ])
};

const mockParcelBundler  = new EventEmitter();
parcelPluginBundleVisualiser(mockParcelBundler);

mockParcelBundler.emit('bundled', mockBundle);