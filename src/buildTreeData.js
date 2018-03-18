//converts a parcel bundle into a data tree importable by the foamtree treemap
const path = require('path');
const filesize = require('filesize');
const gzipSize = require('gzip-size');
const fs = require('fs');

// const WARNING = '⚠️';
const LARGE_BUNDLE_SIZE = 1024 * 1024;

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
  const filePath = formatProjectPath(bundle.name);
  const gzipSize = calcGzipSize(bundle.name);
  const node = {
    label: path.basename(filePath),
    path: '.' + path.sep + filePath,
    weight: bundle.totalSize || 0,
    formattedSize: filesize(bundle.totalSize),
    formattedGzipSize: gzipSize && filesize(gzipSize),
    formattedTime: prettifyTime(bundle.bundleTime),
    isTooLarge: bundle.totalSize > LARGE_BUNDLE_SIZE
  };

  if(bundle.assets){
    node.groups = parseAssets(bundle.assets);
  }

  return node;
}

function calcGzipSize(filePath){
  try{
    const file = fs.readFileSync(filePath, 'utf8');
    return gzipSize.sync(file);
  }catch(e){
    console.error('Failed to calc gzip size for ', filePath);
    console.error(e);
  }
}

function parseAssets(assets){
  const assetTree = [];

  for (let asset of assets) {
    const filePath = formatProjectPath(asset.name);
    const rawAssetData = {
      filePath: filePath,
      size: asset.bundledSize || 0.1, //asset size of zero cause incorrect layout in tree so tweak
      time: asset.buildTime
    };

    insertAssetInTreeByFolder(rawAssetData, assetTree);
  }

  assetTree.forEach((asset)=>{
    sumWeightAndTimeDownTree(asset);
  });

  return assetTree;
}

function insertAssetInTreeByFolder(rawAsset, assetTree = []){
  const folders = rawAsset.filePath.split(path.sep);
  let currentGroup = assetTree;

  for(let i=0; i<folders.length; i++){
    const folder = folders[i];
    const isFile = i+1 >= folders.length; //i.e. is leaf node

    let nextGroup = currentGroup.filter(child => child.label === folder)[0];
    if(!nextGroup){
      nextGroup = { 
        label: folder
      };
      nextGroup.path = '.' + path.sep + folders.slice(0, i+1).join(path.sep);

      if(isFile){
        nextGroup.weight = rawAsset.size;
        nextGroup.time = rawAsset.time;
        nextGroup.formattedTime = prettifyTime(rawAsset.time);
        nextGroup.formattedSize = filesize(rawAsset.size);
        nextGroup.isTooLarge = rawAsset.size > LARGE_BUNDLE_SIZE;
      }else{ 
        nextGroup.groups = []; 
      }

      currentGroup.push(nextGroup);
    }
    currentGroup = nextGroup.groups;
  }
}

function sumWeightAndTimeDownTree(asset){
  if(asset.weight){
    return {weight:asset.weight, time:asset.time};
  }
  let totalWeight = 0;
  let totalTime = 0;

  if(asset.groups){
    asset.groups.forEach((childAsset)=>{
      const {time, weight} = sumWeightAndTimeDownTree(childAsset);
      totalWeight += weight;
      totalTime += time;
    });
  }

  asset.weight = totalWeight;
  asset.formattedTime = prettifyTime(totalTime);
  asset.formattedSize = filesize(totalWeight || 0);
  return {time:totalTime, weight:totalWeight};
}

//path relative to project root
function formatProjectPath(filePath = '') {
  let dir = path.relative(process.cwd(), path.dirname(filePath));
  return dir + (dir ? path.sep : '') + path.basename(filePath);
}

function prettifyTime(milliseconds){
  return milliseconds < 1000 ? `${milliseconds}ms` : `${(milliseconds / 1000).toFixed(2)}s`;
}