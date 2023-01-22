/**
 * @overview    Bill validator
 * @author      Richard Ayotte
 * @copyright   Copyright © 2019 Richard Ayotte
 * @date        2019-01-30 10:40:40
 * @license     MIT License
 */

const createApex7000 = require('./lib/create-apex-7000.js')
const createSerialInterface = require('./lib/create-serial-interface.js')

module.exports = {
	createApex7000,
	createSerialInterface
};