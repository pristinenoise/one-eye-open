module.exports = {
  parser: "babel-eslint",
  env: {
    jest: true
  },
  extends: ["prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error"
  }
};
