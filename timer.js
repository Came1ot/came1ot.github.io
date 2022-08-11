const btn = document.getElementById("startTimer");
const message = document.getElementById("timeLeft");
const alarmSound = new Audio('alarm.wav');


let timer = {
	hours: 0,
	minutes: 0,
	seconds: 0,
	start: true,
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
	var timeLeft = timer.totalSeconds();
	//const timeLeft = getAlarmTime().getTime();
	if (timeLeft <= 0) {
			btn.innerText = "Start";
			message.innerHTML = "";
			alarmSound.pause();
			alarmSound.currentTime = 0;
			timer.start = false;
		} else if(btn.innerText == "Stop") {
			btn.innerText = "Start";
			message.innerHTML = "";
			alarmSound.pause();
			alarmSound.currentTime = 0;
		} else {
			btn.innerText = "Stop";
			timer.start = true;
			timerTick(timeLeft);
		}
})

function timerTick (timeLeft){
	var refreshIntervalId = setInterval(function() {
		if (timeLeft > 0 && timer.start){
			btn.innerText = "Stop";
			timeLeft = timeLeft - 1;
			var hours = Math.floor((timeLeft % (60 * 60 * 24)) / (60 * 60));
			var minutes = Math.floor((timeLeft % (60 * 60)) / (60));
			var seconds = Math.floor(timeLeft % 60);	
			message.innerHTML = hours + "h " + minutes + "m " + seconds + "s ";
			//console.log(hours + "h " + minutes + "m " + seconds + "s ");
		} else {
			message.innerHTML = "";
			clearInterval(refreshIntervalId);
			timer.start = false;
			btn.innerText = "Stop";
			var playId = setInterval(function() {
				alarmSound.play(); 
				timer.duration--;
				if (timer.duration == 0 || timer.start) {
					clearInterval(playId);
					alarmSound.pause();
					alarmSound.currentTime = 0;
					timer.duration = 60;
				}
			}, 1000);
			//console.log("Time expired!");
		}
	}, 1000);
}
