module.exports = {
  transform: {
    "^.+\\.tsx?$": "babel-jest", // TypeScriptやJSXをBabelで変換
  },
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy", // CSSモジュールのモック
  },
  testEnvironment: "jest-environment-jsdom", // jsdom環境を明示的に指定
};
