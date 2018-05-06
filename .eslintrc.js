module.exports = {
  extends: "eslint:recommended", 
  env: {
    es6: true,
    node: true,
    jest: true,
    browser: true,
  },
  globals:{
    CarrotSearchFoamTree: true
  },
  rules: {
      "indent": [ "error", 2 ],
      "linebreak-style": [ "error", "unix" ],
      "quotes": [ "error", "single" ],
      "semi": [ "error", "always" ],
      "no-console": ["error", { allow: ["warn", "error"] }],
  }
};