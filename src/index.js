import Generative from 'generative-radio'
import pieces from './pieces.json'
import { duration } from 'duration-pretty'

const gen = new Generative(pieces)

// The token is not hard coded to the front end code this way, but it is still public,
// in future versions the API calls will be handled on the server.
fetch(window.location.origin+'/token')
	.then((response) => response.text())
	.then((token) => { gen.token = token })

gen.debug = true

gen.ontrigger = ({sound}) => {
	if (sound) {
		const formattedDuration = duration(sound.duration, 'seconds').format('HH:mm:ss:SSS')
		console.log(`					Playing ${sound.name}, duration ${formattedDuration} `)
	}
}

document.querySelector('.start').addEventListener('click', () => { gen.play() })
document.querySelector('.stop').addEventListener('click', () => { gen.stop() })

document.querySelector('input[type="range"]')
	.addEventListener('input', ({target: {value}}) => { gen.gain = value })