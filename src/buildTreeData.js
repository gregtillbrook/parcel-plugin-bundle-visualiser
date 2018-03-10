
//converts a parcel bundle into a data tree importable by the foamtree treemap
const path = require('path');


module.exports = function(mainBundle){
  return {
    groups: Array.from(iterateBundles(mainBundle))
      .map(bundle => parseChildBundle(bundle))
  };
};

function* iterateBundles(bundle) {
  if( bundle.name && bundle.totalSize ){
    yield bundle;
  }
  for (let child of bundle.childBundles) {
    yield* iterateBundles(child);
  }
}

function parseChildBundle(bundle){
  const prettyName = formatFilename(bundle.name);
  const node = {
    label: formatFilename(prettyName),
    weight: bundle.totalSize || 0
  };

  if(bundle.assets){
    node.groups = parseAssets(bundle.assets);
  }

  return node;
}

function parseAssets(assets){
  const assetTree = [];

  for (let asset of assets) {
    const prettyName = formatFilename(asset.name);
    const assetData = {
      label: prettyName,
      weight: asset.bundledSize || 0
    };

    insertAssetInTreeByFolder(assetData, assetTree);
  }

  assetTree.forEach((asset)=>{
    sumWeightsDownTree(asset);
  });

  return assetTree;
}

function insertAssetInTreeByFolder(asset, assetTree = []){
  const folders = asset.label.split(path.sep);
  let currentGroup = assetTree;

  for(let i=0; i<folders.length; i++){
    const folder = folders[i];
    const isFile = i+1 >= folders.length;

    let nextGroup = currentGroup.filter(child => child.label === folder)[0];
    if(!nextGroup){
      nextGroup = { 
        label: folder
      };
      if(isFile){
        nextGroup.weight = asset.weight;
      }else{ 
        nextGroup.groups = []; 
      }
      currentGroup.push(nextGroup);
    }
    currentGroup = nextGroup.groups;
  }
}

function sumWeightsDownTree(asset){
  if(asset.weight){
    return asset.weight;
  }
  let totalWeight = 0;

  if(asset.groups){
    asset.groups.forEach((childAsset)=>{
      totalWeight += sumWeightsDownTree(childAsset);
    });
  }

  asset.weight = totalWeight;
  return totalWeight;
}

function formatFilename(filename = '') {
  let dir = path.relative(process.cwd(), path.dirname(filename));
  return dir + (dir ? path.sep : '') + path.basename(filename);
}