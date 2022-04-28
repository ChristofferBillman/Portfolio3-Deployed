const colors = ['#2797e5', '#6c89e0']

for(let i = 0; i < 20; i++){
	let circle = document.createElement('div')
	circle.setAttribute('id', 'circle'+i)
	let diameter = 0;
	circle.style.width = diameter + 'px'
	circle.style.height = diameter +'px'
	circle.style.position = 'absolute'

	circle.style.top = '50%'
	circle.style.left = '50%'
	circle.style.borderRadius = '100%'
	circle.style.opacity = Math.random() * 0.5 + 0.5
	circle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
	document.getElementById('banner').appendChild(circle)

	let translateX = getTranslation(document.body.clientWidth)
	let translateY = getTranslation(document.body.clientHeight)

	let size = Math.random() * 300 + 100

	let tl = anime.timeline()
	
	anime({
		targets: '#circle'+i,
		translateX: [{ value: translateX, duration: Math.random() * 10000 }],
		translateY: [{ value: translateY, duration: Math.random() * 10000}],
		width: size,
		height: size,
		loop: false,
	}).finished.then(() => {randomLoop('#circle'+i)})
}

function randomLoop(target){

	let translateX = getTranslation(document.body.clientWidth)
	let translateY = getTranslation(document.body.clientHeight)
	let t = target.substring(1)
	// Detta fungerar ej, de åker ändå upp? ??
	if(document.getElementById(t).getBoundingClientRect.top + translateY < 0) translateY = -translateY;

	anime({
		targets: target,
		translateX: [{ value: translateX, duration: Math.random() * 100000 }],
		translateY: [{ value: translateY*2, duration: Math.random() * 100000}],
		ease: 'inOutSine',
		loop: false,
		complete: () =>{
			randomLoop(target)
		}
	})
}

function getRandomSign(){
	return Math.random() < 0.5 ? -1 : 1
}

function getTranslation(bound){
	let translation = Math.random() * 1000 * getRandomSign()
	if(translation + bound/2 > bound || translation + bound < 0){
		translation = bound / 2
	}
	return translation
}