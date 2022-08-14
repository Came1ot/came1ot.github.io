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
<script src="timer.js"></script>
<link rel="stylesheet" href="timer.css">
<audio id="alarmSound" src="alarm.wav" preload="auto"></audio>
</body>
</html>
