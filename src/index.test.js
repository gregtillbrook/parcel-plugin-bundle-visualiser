const EventEmitter = require('events');
const plugin = require('./index');

jest.mock('./buildTreeData');

jest.mock('./buildReportHTML');
const buildReportHTML = require('./buildReportHTML');
buildReportHTML.mockReturnValue('mock report content');

jest.unmock('fs');
const fs = require('fs');
fs.writeFile = jest.fn();


describe('./src/index', ()=>{

  it('should generate report', ()=>{
    const mockBundler = new EventEmitter();
    plugin(mockBundler);

    const mockBundle = {name:'fred'};
    mockBundler.emit('bundled', mockBundle);

    expect(fs.writeFile).toHaveBeenCalledTimes(1);
    const args = fs.writeFile.mock.calls[0];
    expect(args[0]).toEqual('report.html');
    expect(args[1]).toEqual('mock report content');
  });

});
