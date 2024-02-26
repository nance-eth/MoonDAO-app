import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents() {},
    specPattern: 'cypress/e2e/**/*.cy.{js,ts,jsx,tsx}',
    baseUrl: 'http://localhost:3000',
    supportFile: false,
  },
  component: {
    setupNodeEvents() {},
    specPattern: 'cypress/integration/**/*.cy.{js,ts,jsx,tsx}',
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
    // excludeSpecPattern: [
    //   'cypress/integration/layout/main-card.cy.tsx',
    //   'cypress/integration/lock/lock-data.cy.tsx',
    //   'cypress/integration/lock/balance.cy.tsx',
    //   'cypress/integration/lock/time-range.cy.tsx',
    //   'cypress/integration/privy/privy-connect-wallet.cy.tsx',
    //   'cypress/integration/privy/privy-web3-button.cy.tsx',
    //   'cypress/integration/shopify/product.cy.tsx',
    // ],
  },
})
