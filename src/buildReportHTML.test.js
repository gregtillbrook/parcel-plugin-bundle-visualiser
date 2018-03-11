const buildReportHTML = require('./buildReportHTML');

jest.mock('fs'); //so that entire foamtree script isnt loaded


describe('./src/buildReportHTML', ()=>{

  it('should generate a report', ()=>{
    const mockTreeData = {
      groups:[
        { label:'thing1', weight:10 },
        { label:'thing2', weight:20 }
      ]
    };
    const report = buildReportHTML(mockTreeData);
    expect(report).toMatchSnapshot();
  });

});