/**
 * Controller for the "/hello" paths
 */
module.exports = class Hello {
  /**
   * Specify request context
   * @param {Object} context
   */
  constructor(context) {
    this.context = context;
  }

  /**
   * Get greetings message
   * @param {string} name - the one we greeting
   * @return {string}
   */
  hello(name) {
    return `Hello ${name}`;
  }
};
