# Connect wallet widget

## Provider

```tsx
<SettingsProvider>
  <NetworkProvider>
    <Wallet />
  </NetworkProvider>
</SettingsProvider>
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
    },
  }
};
```

## package.json

```json
{
  "dependencies": {
    "@gemunion/provider-network": "0.0.2",
    "@web3-react/core": "6.1.9",
    "@web3-react/injected-connector": "6.0.7",
    "@web3-react/trezor-connector": "6.1.9",
    "@web3-react/walletconnect-connector": "6.2.8",
    "ethers": "5.5.2"
  },
  "devDependencies": {
    "os-browserify": "0.3.0",
    "stream-browserify": "3.0.0",
    "path-browserify": "1.0.1",
    "assert": "2.0.0",
    "crypto-browserify": "3.12.0",
    "buffer": "6.0.3",
    "process": "0.11.10"
  }
}
```