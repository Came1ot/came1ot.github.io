let timer = {
	hours: 0,
	minutes: 0,
	seconds: 0,
	volume: 0.5,
	start: false,
	duration: 30,
	repeat: true,
	repeatTime: 300
};

const btn = document.getElementById('startTimer');
const message = document.getElementsByClassName('message')[0];
const currentTime = document.getElementsByClassName('currentTime')[0];
const getSound = document.getElementById("audioList");
const soundsList = ["alarm.wav", "Charmes ft. Da Professor - Ready.mp3", "Megan Thee Stallion - Cry Baby.mp3", 
	"The Prodigy - Breathe.mp3", "You Never Can Tell.mp3"];
const audio = new Audio();
const volume = document.getElementById('volume');


function getCurrentMs() {
	return window.performance.now()
}

function getCurrentTime() {
	const now = new Date();
	const year = now.getFullYear();
    const month = now.getMonth() + 1;
	const day = now.getDate();    
	const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
	
	const formattedDate = `${year}-${month}-${day}`;
	const formattedTime = `${hours}:${minutes}:${seconds}`;
	//currentTime.innerHTML = `Date: ${formattedDate}, Time: ${formattedTime}`;
	currentTime.innerHTML = now;
}


setInterval(getCurrentTime, 1000);

function fillSelect(values) {
	document.getElementById("audioList").innerHTML =
    values.reduce((tmp, x) => `${tmp}<option>${x}</option>`, '');
	audio.src = soundsList[0];
	audio.volume = timer.volume;
	volume.value = timer.volume * 100;
}
fillSelect(soundsList);

function totalMs() {
	var hours = parseInt(timer.hours);
	var minutes = parseInt(timer.minutes);
	var seconds = parseInt(timer.seconds);
	return (hours * 3600 + minutes * 60 + seconds) * 1000;
}

function enforceMinMax(el){
  if(el.value != ""){
    if(parseInt(el.value) < parseInt(el.min)){
      el.value = el.min;
    }
    if(parseInt(el.value) > parseInt(el.max)){
      el.value = el.max;
    }
  }
}

function selectAudio(item){
	audio.src = item.value;
}

function updateValues(el){
	timer.hours = document.getElementById("hours").value;
	timer.minutes = document.getElementById("minutes").value;
	timer.seconds = document.getElementById("seconds").value;
	showMessage(totalMs());
}

function changeVolume(el){
	timer.volume = document.getElementById("volume").value / 100;
	audio.volume = timer.volume;
}

function showMessage(ms){
	let totalSeconds = ms / 1000;
	let totalMinutes = totalSeconds / 60;
	let totalHours = totalMinutes / 60;
	
	let milliseconds = Math.round(ms % 1000);
	let seconds = Math.floor(totalSeconds % 60);
	let minutes = Math.floor(totalMinutes % 60);
	let hours = Math.floor(totalHours);
	//if (milliseconds < 100) milliseconds = 0;
	//message.innerHTML = hours + "h " + minutes + "m " + seconds + "." + milliseconds + "s";
	message.innerHTML = `${hours}:${minutes}:${seconds}`;

}	

btn.addEventListener ("click", ()=>{
	var startTime = getCurrentMs();
	timer.start = !timer.start;
	if (timer.start) {
		timerTick(startTime);		
	} else {
		timer.start = false;
	}
	btn.innerText = timer.start? "Stop" : "Start";	
})

function timerTick (startTime){
	var timerId = setInterval(function() {
		var timeLeft =  totalMs() - (getCurrentMs() - startTime);
		//console.log(timeLeft);
		if (timeLeft > 0 && timer.start){
			showMessage(timeLeft);
		} else if (timeLeft <= 0){
			clearInterval(timerId);
			playSound(getCurrentMs());
			var repeatId = setInterval (function() {
				var startRepeat = getCurrentMs();
				var repeatTime =  timer.repeatTime - (getCurrentMs() - startRepeat)
				if (repeatTime >= 0 && timer.start && timer.repeat) {
					playSound(getCurrentMs());
					console.log(Math.floor(repeatTime % 60));
				} else {
					clearInterval(repeatId);
					timer.repeatTime = 300;
					
				}
			}, 60000);
		} else {
			clearInterval(timerId);
			timeLeft = 0;
		}
	}, 1);
	if (!timer.start) timer.start = false;
}

function playSound(startPlayTime) {
	var timeLeft = timer.duration - (getCurrentMs() - startPlayTime);
	var playId = setInterval(function() {
		if (timeLeft >= 0 && timer.start){
			audio.play();			
		} else {
			clearInterval(playId);
			audio.pause();
		}
	}, 1);
}
