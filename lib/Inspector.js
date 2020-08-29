/**
 * @typedef {Object} InspectorArgument
 * @property {string=} toUnicode
 * @property {string} info
 */

class Inspector {
  /**
   * Constructor.
   * @param {string} chr character
   * @param {InspectorArgument} param1 
   */
  constructor(chr, { toUnicode, info }) {
    /**
     * @public
     * @type {Array.<number>}
     */
    this.position  = []
    /** @public */
    this.original  = chr
    /** @public */
    this.code      = chr.codePointAt().toString(16)
    /** @public */
    this.toUnicode = toUnicode
    /** @public */
    this.info      = info
  }

  /**
   * @public
   * @param {number} index 
   * @returns {void}
   */
  addPosition(index) {
    this.position.push(index)
  }
};

module.exports = Inspector