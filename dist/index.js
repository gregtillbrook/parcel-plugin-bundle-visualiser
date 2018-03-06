'use strict';

const fs = require('fs');
const path = require('path');

module.exports = function (bundler) {

  bundler.on('bundled', mainBundle => {
    const treeData = buildTreeData(mainBundle);
    const report = buildReportHTML(JSON.stringify(treeData));
    saveReport('report.html', report);
  });

  function loadTextFile(filePath) {
    const filename = require.resolve(filePath);
    return fs.readFileSync(filename, 'utf8');
  }

  function saveReport(fileName, fileContent) {
    fs.writeFile(fileName, fileContent, function (err) {
      if (err) {
        return console.log(err);
      } else {
        console.log(`Bundlee breakdown saved in report: ${fileName}`); // eslint-disable-line no-console
      }
    });
  }

  function* iterateBundles(bundle) {
    yield bundle;
    for (let child of bundle.childBundles) {
      yield* iterateBundles(child);
    }
  }

  function buildTreeData(mainBundle) {
    const data = { groups: [] };
    let bundles = Array.from(iterateBundles(mainBundle)).sort((a, b) => b.totalSize - a.totalSize);

    for (let bundle of bundles) {
      const prettyName = formatFilename(bundle.name);

      const node = {
        label: formatFilename(prettyName),
        weight: bundle.totalSize || 0
      };

      if (bundle.assets) {
        node.groups = parseAssets(bundle.assets);
      }

      data.groups.push(node);
    }

    return data;
  }

  function parseAssets(assets) {
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
    assetArrayTree.forEach(asset => {
      sumWeightsDownTree(asset);
    });
    return assetArrayTree;
  }

  function insertAssetInTreeMapByFolder(asset, mapTree = {}) {
    const folders = asset.label.split(path.sep);
    let currentNode = mapTree;

    for (let i = 0; i < folders.length; i++) {
      const folder = folders[i];
      const isFile = i + 1 >= folders.length;

      if (isFile) {
        currentNode[folder] = {
          label: folder,
          weight: asset.weight,
          isLeaf: true
        };
      } else if (!currentNode[folder]) {
        currentNode[folder] = {};
      }

      currentNode = currentNode[folder];
    }
  }

  function sumWeightsDownTree(asset) {
    if (asset.weight) {
      return asset.weight;
    }
    let totalWeight = 0;

    if (asset.groups) {
      asset.groups.forEach(childAsset => {
        totalWeight += sumWeightsDownTree(childAsset);
      });
    }

    asset.weight = totalWeight;
    return totalWeight;
  }

  function convertMapTreeToArrayTree(mapTree, arrayTree = []) {
    for (let nodeName in mapTree) {
      let node = mapTree[nodeName];

      if (node.isLeaf) {
        arrayTree.push({
          label: nodeName,
          weight: node.weight
        });
      } else {
        arrayTree.push({
          label: nodeName,
          groups: convertMapTreeToArrayTree(node)
        });
      }
    }

    return arrayTree;
  }

  function formatFilename(filename) {
    let dir = path.relative(process.cwd(), path.dirname(filename));
    return dir + (dir ? path.sep : '') + path.basename(filename);
  }

  function buildReportHTML(treeData) {
    const foamTreeScript = loadTextFile('./carrotsearch.foamtree.js');

    return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>FoamTree Quick Start</title>
        <meta charset="utf-8" />
      </head>
    
      <body>
        <div class="container">
          <div id="visualization"></div>
        </div>
        <style>
          body{ margin:0; }
          .container{ display:flex; height:100vh; }
          #visualization{ width:100%; }
        </style>
        <script>${foamTreeScript}</script>
        <script>

          var foamtree;

          window.addEventListener('load', function() {
            foamtree = new CarrotSearchFoamTree({
              id: 'visualization',
              dataObject: ${treeData},
              layoutByWeightOrder:true,
              layout: 'squarified',
              stacking: 'flattened',
              pixelRatio: window.devicePixelRatio || 1,
              maxGroupLevelsDrawn: Number.MAX_VALUE,
              maxGroupLevelsAttached:Number.MAX_VALUE,
              maxGroupLabelLevelsDrawn: Number.MAX_VALUE,
              rolloutDuration: 0,
              pullbackDuration: 0,
              fadeDuration: 0,
              zoomMouseWheelDuration: 300,
              openCloseDuration: 200,
              groupLabelVerticalPadding: 0.2,
              groupBorderRadius: 0,
              
              //TODO: follow up later
              // onGroupHover:function(e){
              //   console.log(evt.group && evt.group.label);
              //   if (e.group) {
              //     if (e.group.company) {
              //       detailsPanel.show(e.group.company);
              //     }
              //   } else {
              //     detailsPanel.hide();
              //   }
              // },

              //zoom to group rather than that weird pop out thing
              onGroupDoubleClick: function(e) {
                e.preventDefault();
                var group = e.group;
                var toZoom;
                if (group) {
                  toZoom = e.secondary ? group.parent : group;
                } else {
                  toZoom = this.get("dataObject");
                }
                this.zoom(toZoom);
              }

            });
          });
    
          window.addEventListener("resize", (function() {
            var timeout;
            return function() {
              window.clearTimeout(timeout);
              timeout = window.setTimeout(foamtree.resize, 300);
            };
          })());

        </script>
      </body>
    </html>
    `;
  }
};