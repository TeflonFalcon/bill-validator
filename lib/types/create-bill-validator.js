/**
 * @overview    Create bill validator type
 * @author      Richard Ayotte
 * @copyright   Copyright © 2019 Richard Ayotte
 * @date        2019-01-20 13:38:59
 * @license     MIT License
 */

const {ObjectModel, FunctionModel} = require('objectmodel')
const BillValidator = require('./bill-validator.js')
const IOInterface = require('./io-interface.js')

const BillValidatorOptions = ObjectModel({
	ioInterface: IOInterface
})

export default FunctionModel(BillValidatorOptions).return(BillValidator)
