const EventEmitter = require('events');
const parcelPluginBundleVisualiser = require('../src/index');

const mockBundle = {
  childBundles: new Set([
    {  
      name:'mock bundle 1',
      totalSize:400,
      childBundles: new Set(),
      assets:new Set([
        {
          name:'module/folder1/asset1',
          bundledSize:120
        },
        {
          name:'module/folder1/asset2',
          bundledSize:100
        }
      ])
    },
    {  
      name:'mock bundle 2',
      totalSize:300,
      childBundles: new Set(),
      assets:new Set([
        {
          name:'module/folder1/asset2',
          bundledSize:100
        }
      ])
    }
  ])
};

const mockParcelBundler  = new EventEmitter();
parcelPluginBundleVisualiser(mockParcelBundler);

mockParcelBundler.emit('bundled', mockBundle);