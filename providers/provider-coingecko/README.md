# Connect coingecko

## Provider

```tsx
<CoinGeckoProvider></CoinGeckoProvider>
```

## Webpack

```ts
const config: Configuration = {
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    modules: ["node_modules"],
    fallback: {
      assert: require.resolve("assert/"),
      path: require.resolve("path-browserify"),
      stream: require.resolve("stream-browserify"),
      os: require.resolve("os-browserify/browser"),
      crypto: require.resolve("crypto-browserify"),
      buffer: require.resolve("buffer/"),
      process: require.resolve("process/browser"),
      https: require.resolve("https-browserify"),
      http: require.resolve("stream-http"),
    },
  }
};
```

## package.json

```json
{
  "dependencies": {},
  "devDependencies": {
    "@gemunion/types-coin-gecko": "0.2.8",
    "@types/react": "17.0.39",
    "notistack": "2.0.3",
    "react": "17.0.2"
  }
}
```