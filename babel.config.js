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
        "@utils": "./src/utils",
        "@bill": "./src/workflow/bill",
        "@mail": "./src/workflow/mail",
        "@design": "./src/workflow/design"
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}