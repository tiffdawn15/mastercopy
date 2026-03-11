exports.config = {
    allScriptsTimeout: 11000,
    specs: [
      './e2e/features/**/*.feature' // Path to your Cucumber feature files
    ],
    capabilities: {
      browserName: 'chrome',
    },
    directConnect: true,
    baseUrl: 'http://localhost:4200/',
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    cucumberOpts: {
      require: ['./e2e/step-definitions/**/*.steps.ts'], // Path to your step definitions
      tags: [],
      strict: true,
      format: ['json:./e2e/reports/cucumber-report.json'], // Output report format
      dryRun: false,
      compiler: 'ts:ts-node/register',
    },
    onPrepare() {
      require('ts-node').register({
        project: require('path').join(__dirname, './tsconfig.json'),
      });
    },
  };