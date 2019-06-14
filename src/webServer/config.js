import path from 'path';

const rootPath = path.resolve(__dirname, '..');

export default ({
  pathInfo: {
    root: rootPath,
    public: path.resolve(rootPath, '..', 'dist'),
  },
});
