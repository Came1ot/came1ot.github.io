const btn = document.getElementById('startTimer');
const message = document.getElementById('timeLeft');
const alarmSound = new Audio('alarm.wav');

let timer = {
	hours: 0,
	minutes: 0,
	seconds: 0,
	start: false,
	duration: 30,
	repeat: true,
	repeatTime: 300,
	totalSeconds: function(){
	return this.hours + +this.minutes + +this.seconds
	}
};

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

function getAlarmTime(){
	const now = new Date();
	timer.hours = document.getElementById("hours").value * 3600;
	timer.minutes = document.getElementById("minutes").value * 60;
	timer.seconds = document.getElementById("seconds").value;
}

btn.addEventListener ("click", ()=>{
	timer.start = !timer.start;
	getAlarmTime();
	

	const timeLeft = timer.totalSeconds();
	console.log(timer);
	if (timer.start && timeLeft > 0) {
		timerTick(timeLeft);
	} else {
		timer.start = false;
		//alarmSound.pause();
		//alarmSound.currentTime = 0;
	}
	btn.innerText = timer.start? "Stop" : "Start";	
})

function timerTick (timeLeft){
	var timerId = setInterval(function() {
		if (timeLeft > 0 && timer.start){
			var hours = Math.floor((timeLeft % (60 * 60 * 24)) / (60 * 60));
			var minutes = Math.floor((timeLeft % (60 * 60)) / (60));
			var seconds = Math.floor(timeLeft % 60);	
			message.innerHTML = hours + "h " + minutes + "m " + seconds + "s ";
			timeLeft--;
		} else {
			message.innerHTML = "";
			clearInterval(timerId);
			playSound();
			var repeatId = setInterval (function() {
				if (timer.repeatTime >= 0 && timer.start && timer.repeat) {
					timer.repeatTime--;
					playSound();
				} else {
					clearInterval(repeatId);
					timer.repeatTime = 300;
					
				}
			}, 60000);
		}
	}, 1000);
	if (!timer.start) timer.start = false;
}

function playSound() {
	var playId = setInterval(function() {
		if (timer.duration >= 0 && timer.start){
			alarmSound.play(); 
			timer.duration--;				
		} else {
			clearInterval(playId);
			alarmSound.pause();
			alarmSound.currentTime = 0;
			timer.duration = 30;
		}
	}, 1000);
}
