//ensures consistency of test results on windows and linux/mac
const originalPath = require.requireActual('path');
const path = jest.genMockFromModule('path');
const mockFolderSeperator = '\\';

path.sep = mockFolderSeperator;
path.basename = (str) => str.slice(str.lastIndexOf(mockFolderSeperator)+1);
path.dirname = (str) => str.slice(0, str.lastIndexOf(mockFolderSeperator));
path.join = (...args) => args.join(mockFolderSeperator);
path.relative = originalPath.relative;

module.exports = path;