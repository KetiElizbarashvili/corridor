
const N = 39;
const FG = [202, 93, 198];
const BG = [32, 29, 42];
const DURATION = 5;


const style = document.createElement('style');
const canvas = document.createElement('canvas');
canvas.style.background = `rgb(${BG})`;
const ctx = canvas.getContext('2d');
const box = document.createElement('div');
const box2 = document.createElement('div');
box.className = 'box';
box2.className = 'box two';
const state = {};

function init () {
	state.w = canvas.width = window.innerWidth * 2;
	state.h = canvas.height = window.innerHeight * 2;
	ctx.strokeStyle = `rgb(${FG})`;
	
	draw();
}

function draw() {
	const {w, h} = state;
	ctx.clearRect(0, 0, w, h);
	ctx.beginPath();
	ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
	for (let i = 0; i <= N; ++i) {
		const x = i * w / N;
		const y = i * h / N;
		
		ctx.moveTo(x, 0);
		ctx.lineTo(w - x, h);
		ctx.moveTo(0, y);
		ctx.lineTo(w, h - y);
		ctx.rect((w - x) / 2, (h - y) / 2, x, y);
		ctx.fill();
	}
	ctx.stroke();
	
	ctx.fillStyle = ctx.strokeStyle;
	ctx.fillRect(w * (1/2 - 2/N), h * (1/2 - 2/N), w * 4/N, h * 4/N);
}

init();

const css = document.createTextNode(`
	html, body, canvas {
		height: 100%;
		width: 100%;
	}

	body {
		margin: 0;
	}

	.box {
		position: absolute;
		top: 50%;
		left: 50%;
		box-sizing: border-box;
		border: 4px solid rgb(${FG});
		transform: translate(-50%, -50%);
		animation: move ${DURATION}s steps(${N}, start) infinite;
	}

	.two {
		animation-delay: ${DURATION / 2}s;
	}

	@keyframes move {
		from {
			width: 0;
			height: 0;
			background: rgba(${FG}, 0.3);
		}
		to {
			width: 100%;
			height: 100%;
			background: rgba(${FG}, 0);
		}
	}
`);
style.appendChild(css);
document.head.appendChild(style);

window.addEventListener('resize', init);
document.body.appendChild(canvas);
document.body.appendChild(box);
document.body.appendChild(box2);
