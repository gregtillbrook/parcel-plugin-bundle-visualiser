//merges tree data into page template + inlines scripts
const fs = require('fs');


module.exports = function(treeData){
  const styles = loadTextFile('./buildReportAssets/styles.css');
  const foamTreeScript = loadTextFile('./buildReportAssets/carrotsearch.foamtree.js');
  const initScript = loadTextFile('./buildReportAssets/init.js');
  const treeDataString = JSON.stringify(treeData);

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
      <div class="tooltip"></div>

      <style>${styles}</style>
      <script>
        window.TREE_DATA = ${treeDataString};
      </script>
      <script>${foamTreeScript}</script>
      <script>${initScript}</script>

    </body>
  </html>
  `;
};

function loadTextFile(filePath){
  const filename = require.resolve(filePath);
  return fs.readFileSync(filename, 'utf8');
}
