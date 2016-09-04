function makeFullscreen(el) {
	var rfs = el.requestFullscreen
			|| el.webkitRequestFullscreen
			|| el.mozRequestFullscreen
			|| el.msRequestFullscreen;
	rfs.call(el);
}

function leaveFullscreen() {
	var efs = document.exitFullscreen
			|| document.webkitExitFullscreen
			|| document.mozExitFullscreen
			|| document.msExitFullscreen;
	efs.call(document);
}

function isFullscreenEnabled() {
	var fse = document.fullscreenElement
			|| document.webkitFullscreenElement
			|| document.mozFullscreenElement
			|| document.msFullscreenElement;
	return !!fse;
}

function measure(e) {
	return {
		width: e.offsetWidth,
		height: e.offsetHeight,
		compare(otherSize) {
			if(this.width > otherSize.width ||
				this.height > otherSize.height)
				return Math.max(this.height-otherSize.height, 0)+
					Math.max(this.width-otherSize.width, 0);
			if(this.width == otherSize.width ||
				this.height == otherSize.height)
				return 0;
			return -Math.max(otherSize.height-this.height, 0)-
					Math.max(otherSize.width-this.width, 0);
		}
	};
}

function blowUp(content) {
	var p = measure(content.parentNode);
	var size = 72;
	var low = 10;
	var high = 1340;
	while(low < high) {
		content.style.fontSize = size+"pt";
		var diff = measure(content).compare(p);
		if(diff > -64 && diff <= 0)
			break;
		if(diff < 0)
			low = size;
		if(diff > 0)
			high = size;
		size = (low+high)*0.5;
	}
}

text.addEventListener("input", event => {
	signContent.textContent = event.target.value;
});

text.addEventListener("keydown", event => {
	if(isFullscreenEnabled()) {
		leaveFullscreen();
	} else {
		if(event.which === 13) {
			makeFullscreen(sign);
			event.target.select();
		}
	}
});

fs.addEventListener("click", event => {
	makeFullscreen(sign);
});

["fullscreenchange","msfullscreenchange","mozfullscreenchange","webkitfullscreenchange"].forEach(eventName => document.addEventListener(eventName, event => {
	if(isFullscreenEnabled())
		blowUp(signContent);
}));

sign.addEventListener("click", event => {
	leaveFullscreen();
});

