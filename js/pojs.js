// JavaScript Document
function initPage()
{
	s = document.getElementById("select");
	i = 9;
	while (++i < 60)
	{
		if (i != 25)
			s.innerHTML += '<option value="' + i + '">' + i+ '分钟</option>';
		else
			s.innerHTML += '<option value="25" selected="selected">25分钟</option>';
	}
	
	s = document.getElementById("select2");
	i = 4;
	while (++i < 11)
	{
		if (i != 5)
			s.innerHTML += '<option value="' + i + '">' + i+ '分钟</option>';
		else
			s.innerHTML += '<option value="5" selected="selected">5分钟</option>';
	}
	
	s = document.getElementById("select3");
	i = 2;
	while (++i < 11)
	{
		if (i != 5)
			s.innerHTML += '<option value="' + i + '">' + i+ '个番茄钟</option>';
		else
			s.innerHTML += '<option value="5" selected="selected">5个番茄钟</option>';
	}
	
	s = document.getElementById("select4");
	i = 4;
	while (++i < 31)
	{
		if (i != 20)
			s.innerHTML += '<option value="' + i + '">' + i+ '分钟</option>';
		else
			s.innerHTML += '<option value="20" selected="selected">20分钟</option>';
	}
}

btn = document.getElementById("btn");
isBeginned = false;
settingDiv = document.getElementById("settingDiv");
stateDiv = document.getElementById("stateDiv");


remainTimeM = 0;
remainTimeS = 0;
workTime = 0;
shortBreakTime = 0;
longBreakTime = 0;
longInterval = 0;

stateStrings = new Array();
stateStrings[0] = "工作中<br>";
stateStrings[1] = "短休息<br>";
stateStrings[2] = "长休息";
stateIndex = 0;
workingState = 0;
shortBreakingState = 1;
longBreakingState = 2;

function init()
{
	counts = 0;
	workTime = document.getElementById("select").value;
	shortBreakTime = document.getElementById("select2").value;
	longBreakTime = document.getElementById("select4").value;
	longInterval = document.getElementById("select3").value;
	changeState(workingState);
	timeInsisted = 0;
	showTime();
}

stateLabel = document.getElementById("stateText");
function changeState(i)
{
	stateIndex = i;
	stateLabel.innerHTML = stateStrings[i];
	remainTimeS = 0;
	var song=document.getElementById("song");
	
	if (i == workingState)
		remainTimeM = workTime;
	else if (i == shortBreakingState)
	{
		remainTimeM = shortBreakTime;
		song.play();
	}
	else
		{
			remainTimeM = longBreakTime;
			song.play();
		}
}

timeInsisted = 0;
function showInsistedTime()
{
	stateLabel.innerHTML += "<p style='font-size:13px'>已经坚持了" + timeInsisted + "个番茄钟";
}

timeRemainLabel = document.getElementById("timeRemainText");
function showTime()
{
	m = (remainTimeM > 9 ? "" : "0") + remainTimeM;
	s = (remainTimeS > 9 ? "" : "0") + remainTimeS;
	timeRemainLabel.innerHTML = m + ":" + s;
}

function interval()
{
	--remainTimeS;
	if (remainTimeS < 0)
	{
		--remainTimeM;
		remainTimeS = 59;
	}
	if (remainTimeM < 0)
	{
		if (stateIndex == workingState)
		{
			++timeInsisted;
			if (timeInsisted % longInterval == 0)
			{
				changeState(longBreakingState);
				showInsistedTime();
			}
			else
			{
				changeState(shortBreakingState);
			}
		}
		else
		{
			changeState(workingState);
		}
	}
	showTime();
}

timeID = null;
function onClick()
{
	isBeginned = !isBeginned;
	if (isBeginned)
	{
		btn.value = "停止";
		settingDiv.style.display = "none";
		stateDiv.style.display = "block";
		init();
		timeID = setInterval("interval()",1000);
	}
	else
	{
		btn.value = "开始";
		settingDiv.style.display = "block";
		stateDiv.style.display = "none";
		clearInterval(timeID);
	}
}