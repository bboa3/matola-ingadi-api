module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        "@core": "./src/core",
        "@bill": "./src/workflow/bill",
        "@user": "./src/workflow/user",
        "@design": "./src/workflow/design"
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}