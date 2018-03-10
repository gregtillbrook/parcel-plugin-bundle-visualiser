const buildTreeData = require('./buildTreeData');

jest.unmock('path');


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
          name:'mock bundle 1',
          totalSize:400,
          childBundles: new Set(),
          assets:new Set([
            {
              name:'module/folder1/asset1',
              bundledSize:120
            },
            {
              name:'module/folder1/asset2',
              bundledSize:100
            }
          ])
        },
        {  
          name:'mock bundle 2',
          totalSize:200,
          childBundles: new Set(),
          assets:new Set([
            {
              name:'module/folder1/asset2',
              bundledSize:100
            }
          ])
        }
      ])
    };
    const tree = buildTreeData(mockParcelBundle);
    expect(tree).toMatchSnapshot();
  });

});