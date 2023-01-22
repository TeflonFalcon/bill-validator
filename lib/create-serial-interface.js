/**
 * @overview    Serial IO interface
 * @author      Richard Ayotte
 * @copyright   Copyright © 2019 Richard Ayotte
 * @date        2019-01-22 13:38:30
 * @license     MIT License
 */

const {promisify} = require('util')
const {ByteLengthParser} = require('@serialport/parser-byte-length')
const {SerialPort} = require('serialport')

const IOInterface = require('./types/io-interface.js')
const CreateSerialInterfaceFunction = require('./types/create-serial-interface.js')

module.exports = CreateSerialInterfaceFunction(options => {
	let parser = null

	const port = new SerialPort(
		{...options.portOptions}
	)

	/**
	 * Promisify some port methods to satisfy IOInterface interface.
	 */
	const openPort = promisify(port.open.bind(port))
	const closePort = promisify(port.close.bind(port))
	const writePort = promisify(port.write.bind(port))
	const drainPort = promisify(port.drain.bind(port))

	const serialPortInterface = IOInterface({
		async close() {
			return closePort()
		}
		, async open() {
			if (parser === null) {
				console.log('WARNING: Parser is null. Did you set the rxMessageLength?')
			}
			return openPort()
		}
		, setOptions({rxMessageLength}) {
			if (rxMessageLength) {
				parser = port.pipe(new ByteLengthParser({
					length: rxMessageLength
				}))

				parser.on('data', data => {
					serialPortInterface.emit('data', data)
				})
			}
		}
		, async write(data) {
			await writePort(data)
			return drainPort()
		}
	})

	// Bubble up errors
	port.on('error', error => {
		serialPortInterface.emit('error', error)
	})

	// Close port on ctrl-c
	port.on('open', () => {
		console.log('Opened port...')
		process.once('SIGUSR2', () => {
			const die = () => process.kill(process.pid, 'SIGUSR2')
			port.close(die)
		})
	})

	return serialPortInterface
})
