const buildReportHTML = require('./buildReportHTML');

jest.mock('fs');


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