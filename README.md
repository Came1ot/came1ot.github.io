<!DOCTYPE html>
<html>
<head>
	<title>Timer</title>
</head>
<body>
	<div class="timer">
		<div class="message"></div>
		<div class="alarmTime"></div>
		<div class="timer">
			<p>
				<label for="hours">Hours</label>
					<input id="hours" name="timer" type="number" value="0" min="0" max="24" onkeyup="enforceMinMax(this)">
			</p>
			<p>
				<label for="minutes">Minutes</label>
					<input id="minutes" name="timer" type="number" value="0" min="0" max="60" onkeyup="enforceMinMax(this)">
				</label>
			</p>
			<p>
				<label for="seconds">Seconds</label>
					<input id="seconds" name="timer" type="number" value="0" min="0" max="60" onkeyup="enforceMinMax(this)">
			</p>
			<button id="startTimer" type="button">Start</button>
		</div>
	</div>
<script src="[timer.js](https://github.com/Came1ot/came1ot.github.io/blob/main/timer.js)"></script>
<audio id="alarmSound" src="[alarm.wav](https://user-images.githubusercontent.com/19853553/184044130-7b8bf293-3282-418a-862a-4ef94991a8a6.mp4)" preload="auto"></audio>
<link rel="stylesheet" href="[timer.css](https://github.com/Came1ot/came1ot.github.io/blob/main/timer.css)">
</body>
</html>
