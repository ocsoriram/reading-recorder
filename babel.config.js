module.exports = {
  presets: [
    "@babel/preset-env",        // 最新のJavaScript構文を変換
    ["@babel/preset-react", {
      "runtime": "automatic"
    }] ,     // JSX構文をサポート
    "@babel/preset-typescript"  // TypeScript構文をサポート
  ],
  plugins: [
    ["@babel/plugin-transform-react-jsx", {
      "runtime": "automatic"
    }]
  ],
};