import babel from 'rollup-plugin-babel';
import includepaths from 'rollup-plugin-includepaths';

module.exports = {
  input: './index.js',
  output: {
    file: 'bundle.js',
    format: 'cjs',
  },
  external: [
    'react',
    'react-proptypes',
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    includepaths({
      include: {},
      paths: ['src'],
      external: [],
      extensions: ['.js'],
    }),
  ],
};
