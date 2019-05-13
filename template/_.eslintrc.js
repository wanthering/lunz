module.exports = {
  'env': {
    'es6': true,
    'node': true<% if(test) { %>,
    'jest/globals': true<% } %>
  }<% if(test) { %>,
 'plugins': ['jest']<% } %>,
  'extends': ['standard'<% if(prettier) { %>,'prettier','plugin:prettier/recommended'<% } %>],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  }
}
