jest.mock('./buildTreeData');

jest.mock('./buildReportHTML');
const buildReportHTML = require('./buildReportHTML');
buildReportHTML.mockReturnValue('mock report content');

jest.unmock('fs');
const fs = require('fs');
fs.writeFile = jest.fn();

jest.mock('path');


// jest.mock('yargs');
// const yargs = require('yargs');

const EventEmitter = require('events');
const plugin = require('./index');

process.env.NODE_ENV = 'production'; // mock env to production, to allow report to be built

describe('./src/index', ()=>{

  beforeEach(()=>{
    fs.writeFile.mockClear();
  });

  // Temporarily skipping arg check until Ive resolved https://github.com/gregtillbrook/parcel-plugin-bundle-visualiser/issues/6
  /*
  it('should not generate flag when "--visualise" arg is not supplied', ()=>{
    yargs.argv = {};
    simulateParcelBundling();

    expect(fs.writeFile).not.toHaveBeenCalled();
  });

  it('should generate report when "--visualise" arg is supplied', ()=>{
    yargs.argv = {visualise:true};
    simulateParcelBundling();

    expect(fs.writeFile).toHaveBeenCalledTimes(1);
    const args = fs.writeFile.mock.calls[0];
    expect(args[0]).toEqual('report.html');
    expect(args[1]).toEqual('mock report content');
  });

  it('should also accept alt spelling for arg "--visualize"', ()=>{
    yargs.argv = {visualize:true};
    simulateParcelBundling();

    expect(fs.writeFile).toHaveBeenCalledTimes(1);
  });
  */
  it('should generate report', ()=>{
    simulateParcelBundling();

    expect(fs.writeFile).toHaveBeenCalledTimes(1);
    const args = fs.writeFile.mock.calls[0];
    expect(args[0]).toEqual('outdir\\report.html');
    expect(args[1]).toEqual('mock report content');
  });

  function simulateParcelBundling(){
    const mockBundler = new EventEmitter();
    mockBundler.options = {
      outDir: 'outdir'
    };

    plugin(mockBundler);

    const mockBundle = {name:'fred'};
    mockBundler.emit('bundled', mockBundle);
  }

});
