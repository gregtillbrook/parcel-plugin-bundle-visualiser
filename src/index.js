'use strict';
const fs = require('fs');
const path = require('path');

const buildTreeData = require('./buildTreeData');
const buildReportHTML = require('./buildReportHTML');


module.exports = function (bundler) {
  const isBundleReportEnabled = process.env.NODE_ENV === 'production';

  if(isBundleReportEnabled){
    bundler.on('bundled', mainBundle=>{
      const filename = path.join(bundler.options.outDir, 'report.html');
      const treeData = buildTreeData(mainBundle);
      const report = buildReportHTML(treeData);
      saveReport(filename, report);
    });
  }

};

function saveReport(fileName, fileContent){
  fs.writeFile(fileName, fileContent, function(err) {
    if(err) { 
      return console.error(err);
    }else{
      console.log(`Bundle breakdown saved in report: ${fileName}`); // eslint-disable-line no-console
    }
  });
}
