'use strict';
const fs = require('fs');

const buildTreeData = require('./buildTreeData');
const buildReportHTML = require('./buildReportHTML');


module.exports = function (bundler) {
  const isBundleReportEnabled = process.env.NODE_ENV === 'production';

  if(isBundleReportEnabled){
    bundler.on('bundled', mainBundle=>{
      const treeData = buildTreeData(mainBundle);
      const report = buildReportHTML(treeData);
      // bundle-visualiser
      saveReport(process.env.PARCEL_BUNDLE_VISUALISER_REPORT || 'report.html', report);
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
