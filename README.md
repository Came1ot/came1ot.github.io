<!DOCTYPE html>
<html>
<head>
<title>Timer</title>
</head>
<body>
<div class="listOfTimers">
	<div><p id="timeLeft"></p></div>	
    <div class="message"></div>
    <div class="alarmTime"></div>
	<div class="add">
		<label>Hours<br><input id="hours" type="number" value="0" min="0" max="24" onkeyup="enforceMinMax(this)">
		</label><br>
		<label>Minutes<br><input id="minutes" type="number" value="0" min="0" max="60" onkeyup="enforceMinMax(this)">
		</label><br>
		<label>Seconds<br><input id="seconds" type="number" value="0" min="0" max="60" onkeyup="enforceMinMax(this)">
		</label><br><br>
		<button id="startTimer" type="button">Start</button>
	</div>	
</div>
<script src="https://github.com/Came1ot/came1ot.github.io/blob/main/timer.js"></script>
<audio id="alarmSound" src="https://github.com/Came1ot/came1ot.github.io/blob/main/alarm.wav" preload="auto"></audio>
</body>
</html>