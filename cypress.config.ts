import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
      options: {
        projectConfig: {
          root: "",
          sourceRoot: "./src",
          buildOptions: {
            outputPath: "./dist",
            index: "./src/index.html",
            main: "./src/main.ts",
            tsConfig: "./tsconfig.app.json",
            inlineStyleLanguage: "scss",
            styles: ["./src/styles.scss"],
            buildOptimizer: false,
            optimization: false,
            vendorChunk: true,
            extractLicenses: false,
            sourceMap: true,
            namedChunks: true,
          },
        },
      },
    },
    specPattern: "**/*.cy.ts",
  },

  e2e: {
    baseUrl: 'http://localhost:4200',
    specPattern: 'cypress/e2e/**/*.ts',
    experimentalRunAllSpecs: true,
    testIsolation: false,
    downloadsFolder: 'cypress/downloads',
    trashAssetsBeforeRuns: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
