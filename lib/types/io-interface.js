/**
 * @overview    Hardware IO interface type
 * @author      Richard Ayotte
 * @copyright   Copyright © 2019 Richard Ayotte
 * @date        2019-01-21 12:39:20
 * @license     MIT License
 */

const {ObjectModel, FunctionModel} = require('objectmodel')
const EventEmitter2 = require('eventemitter2')

const IOInterface = ObjectModel({
	close: FunctionModel().return(Promise)
	, open: FunctionModel().return(Promise)
	, setOptions: FunctionModel(Object)
	, write: FunctionModel(Buffer).return(Promise)
}).extend(EventEmitter2)

export default IOInterface
