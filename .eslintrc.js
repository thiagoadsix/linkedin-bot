module.exports = {
  env: {
    commonjs: true,
    node: true,
    jest: true,
    es2020: true,
    es6: true,
  },
  parser: "babel-eslint",
  extends: "eslint:recommended",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    strict: 0,
  },
};
