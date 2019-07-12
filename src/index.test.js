jest.mock('./buildTreeData');

jest.mock('./buildReportHTML');
const buildReportHTML = require('./buildReportHTML');
buildReportHTML.mockReturnValue('mock report content');

jest.unmock('fs');
const fs = require('fs');
fs.writeFile = jest.fn();

jest.mock('path');

const EventEmitter = require('events');
const plugin = require('./index');

process.env.NODE_ENV = 'production'; // mock env to production, to allow report to be built

describe('./src/index', () => {
  beforeEach(() => {
    fs.writeFile.mockClear();
  });

  it('should generate report', () => {
    simulateParcelBundling();

    expect(fs.writeFile).toHaveBeenCalledTimes(1);
    const args = fs.writeFile.mock.calls[0];
    expect(args[0]).toEqual('outdir\\report.html');
    expect(args[1]).toEqual('mock report content');
  });

  function simulateParcelBundling() {
    const mockBundler = new EventEmitter();
    mockBundler.options = {
      outDir: 'outdir',
    };

    plugin(mockBundler);

    const mockBundle = { name: 'fred' };
    mockBundler.emit('bundled', mockBundle);
  }
});
