jest.mock('fs', () => ({
  //for the gzip file load
  readFileSync: () => 'ahsdkajhskdhakdhajkfhjaksklsdjasjlkfhjaklsfjklasjfklasjfklasjfklajflkahsfuoi23uriouioruiru2223095720895723089509237509237057uworuwoifudosiufsoufposufosfsdfjd'
}));

jest.mock('path');

const buildTreeData = require('./buildTreeData');


describe('./src/buildTreeData', ()=>{

  it('should return an empty tree for an empty bundle', ()=>{
    const mockParcelBundle = {
      childBundles: new Set()
    };
    const tree = buildTreeData(mockParcelBundle);
    expect(tree).toMatchSnapshot();
  });

  it('should generate tree data', ()=>{
    const mockParcelBundle = {
      childBundles: new Set([
        {  
          name:sep('dist/blah/mock bundle 1'),
          totalSize:400,
          bundleTime:200,
          childBundles: new Set(),
          assets:new Set([
            {
              name:sep('module/folder1/asset1'),
              bundledSize:120,
              buildTime:20
            },
            {
              name:sep('module/folder1/asset2'),
              bundledSize:100,
              buildTime:30
            }
          ])
        },
        {  
          name:sep('dist/blah/mock bundle 2'),
          totalSize:200,
          bundleTime:200,
          childBundles: new Set(),
          assets:new Set([
            {
              name:sep('module/folder1/asset2'),
              bundledSize:100,
              buildTime:200
            }
          ])
        }
      ])
    };
    const tree = buildTreeData(mockParcelBundle);
    expect(tree).toMatchSnapshot();
  });

  function sep(path){
    const mockFolderSeperator = '\\';    
    //make folder seperators consistent so we can use same test in windows and linux/mac
    return path.replace(new RegExp('/', 'g'), mockFolderSeperator);
  }

});