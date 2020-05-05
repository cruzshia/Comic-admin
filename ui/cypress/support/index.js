// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
const isSideTabSelected = (_chai, utils) => {
  function assertIsSideTabSelected(options) {
    this.assert(
      this._obj.css('fontWeight') === '700' && this._obj.css('backgroundColor') === 'rgb(245, 245, 245)',
      'expected #{this} css font-weight to be 700 and background-color = rgb(245, 245, 245)',
      'expected #{this} css font-weight not to be 700 and background-color = rgb(245, 245, 245)',
      this._obj
    )
  }

  _chai.Assertion.addMethod('sideTabSelected', assertIsSideTabSelected)
}

// registers our assertion function "isFoo" with Chai
chai.use(isSideTabSelected)
