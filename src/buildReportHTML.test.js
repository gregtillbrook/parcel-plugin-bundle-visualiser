const buildReportHTML = require('./buildReportHTML');

//mocking so that entire foamtree script isnt loaded
//note: unit test will stil fail if loadTextFile is passed a invalid file
jest.mock('fs', () => ({
  readFileSync: () => 'mock inlined contents'
}));

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