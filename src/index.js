'use strict';
const fs = require('fs');

const buildTreeData = require('./buildTreeData');
const buildReportHTML = require('./buildReportHTML');


module.exports = function (bundler) {

  bundler.on('bundled', mainBundle=>{
    const treeData = buildTreeData(mainBundle);
    const report = buildReportHTML(treeData);
    saveReport('report.html', report);
  });

};

function saveReport(fileName, fileContent){
  fs.writeFile(fileName, fileContent, function(err) {
    if(err) { 
      return console.log(err); 
    }else{
      console.log(`Bundle breakdown saved in report: ${fileName}`); // eslint-disable-line no-console
    }
  });
}