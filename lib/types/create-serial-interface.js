/**
 * @overview    Create serial interface type
 * @author      Richard Ayotte
 * @copyright   Copyright © 2019 Richard Ayotte
 * @date        2019-01-22 17:16:08
 * @license     MIT License
 */

const {ObjectModel, FunctionModel} = require('objectmodel')
const IOInterface = require('./io-interface.js')

const SerialInterfaceOptions = ObjectModel({
	portOptions: Object
})

export default FunctionModel(SerialInterfaceOptions).return(IOInterface)
