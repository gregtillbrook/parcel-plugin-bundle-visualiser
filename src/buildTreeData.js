
//converts a parcel bundle into a data tree importable by the foamtree treemap
const path = require('path');


module.exports = function(mainBundle){
  const data = { groups:[]};
  let bundles = Array.from(iterateBundles(mainBundle)).sort(
    (a, b) => b.totalSize - a.totalSize
  );

  for (let bundle of bundles) {
    const prettyName = formatFilename(bundle.name);

    const node = {
      label: formatFilename(prettyName),
      weight: bundle.totalSize || 0
    };

    if(bundle.assets){
      node.groups = parseAssets(bundle.assets);
    }

    data.groups.push(node);
  }

  return data;
};

function* iterateBundles(bundle) {
  yield bundle;
  for (let child of bundle.childBundles) {
    yield* iterateBundles(child);
  }
}

function parseAssets(assets){
  const assetMapTree = {};

  for (let asset of assets) {
    const prettyName = formatFilename(asset.name);
    const assetData = {
      label: prettyName,
      weight: asset.bundledSize || 0
    };

    insertAssetInTreeMapByFolder(assetData, assetMapTree);
  }

  //TODO: refactor this crap - it's unnecessarily complicated
  const assetArrayTree = convertMapTreeToArrayTree(assetMapTree);
  assetArrayTree.forEach((asset)=>{
    sumWeightsDownTree(asset);
  });
  return assetArrayTree;
}

function insertAssetInTreeMapByFolder(asset, mapTree = {}){
  const folders = asset.label.split(path.sep);
  let currentNode = mapTree;

  for(let i=0; i<folders.length; i++){
    const folder = folders[i];
    const isFile = i+1 >= folders.length;

    if(isFile){
      currentNode[folder] = {
        label: folder,
        weight: asset.weight,
        isLeaf: true
      };
    }else if(!currentNode[folder]){
      currentNode[folder] = {};
    }

    currentNode = currentNode[folder];
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

function convertMapTreeToArrayTree(mapTree, arrayTree=[]){
  for(let nodeName in mapTree){
    let node = mapTree[nodeName];

    if(node.isLeaf){
      arrayTree.push({
        label: nodeName,
        weight: node.weight
      });
    }else{
      arrayTree.push({
        label: nodeName,
        groups: convertMapTreeToArrayTree(node)
      });
    }
  }

  return arrayTree;
}

function formatFilename(filename = '') {
  let dir = path.relative(process.cwd(), path.dirname(filename));
  return dir + (dir ? path.sep : '') + path.basename(filename);
}