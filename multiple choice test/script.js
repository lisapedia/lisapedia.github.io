const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

const userData = document.getElementById("userData");
const name = document.getElementById("name");
const brigade = document.getElementById("brigade");
const personnelNumber = document.getElementById("personnelNumber");
const saveButton = document.getElementById("save");

saveButton.addEventListener("click", showStart);
let userName, staffID, brigadeId;
let result = "";
function showStart(){
	
	if (userData.value != "" && personnelNumber.value != "" && brigade.value != "") 
	{
		userName = name.value;
		staffID = personnelNumber.value;
		brigadeId = brigade.value;
		userData.style.display = "none";
		start.style.display = "block";
		result += "Имя: " + userName + "\r\n" + "Бригада: " + brigadeId + "\r\n" + "Табельный номер: " + staffID + "\r\n";
	} else{
		alert("Все поля необходимо заполнить!");
		document.getElementById("name").autofocus;
	}
	
}

let count = 0;
const questionTime = 120; //120s
const gaugeWidth = 150; //150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

let questions = [
{
	question: "A number one followed by one hundred zeros is known by what name?",
	imgSrc: "img/question_1.png",
	choiceA: "Googol",
	choiceB: "Megatron",
	choiceC: "Gigabit",
	choiceD: "Nanamote",
	correct: "A"
},
{
	question: "Which scientific unit is named after an Italian nobleman?",
	imgSrc: "img/question_2.png",
	choiceA: "Pascal",
	choiceB: "Ohm",
	choiceC: "Volt",
	choiceD: "Hertz",
	correct: "C"
},
{
	question: "Who was the first man to travel into space twice?",
	imgSrc: "img/question_3.png",
	choiceA: "Vladimir Titov",
	choiceB: "Michael Collins",
	choiceC: "Gus Grissom",
	choiceD: "Yuri Gagarin",
	correct: "C"
},
{
	question: "Oberon is the satellite of which planet?",
	imgSrc: "img/question_4.png",
	choiceA: "Neptune",
	choiceB: "Uranus",
	choiceC: "Mars",
	choiceD: "Mercury",
	correct: "B"
},
{
	question: "If you planted the seeds of 'Quercus robur', what would grow??",
	imgSrc: "img/question_5.png",
	choiceA: "Vegetables",
	choiceB: "Grain",
	choiceC: "Flowers",
	choiceD: "Trees",
	correct: "D"
}
];

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
var blobObject = null;
function renderQuestion(){
	let q = questions[runningQuestion];

	question.innerHTML = "<p>"+ q.question +"</p>";
	qImg.innerHTML = "<img src="+ q.imgSrc +">";
	choiceA.innerHTML = q.choiceA;
	choiceB.innerHTML = q.choiceB;
	choiceC.innerHTML = q.choiceC;
	choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click", startQuiz);

function startQuiz(){
	start.style.display = "none";
	renderQuestion();
	quiz.style.display = "block";
	renderProgress();
	renderCounter();
TIMER = setInterval(renderCounter, 1000);//1000 ms
}


function renderProgress(){
	for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
		progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
	}
}



function renderCounter(){
	if (count <= questionTime) {
		counter.innerHTML = count;
		timeGauge.style.width = count * gaugeUnit +"px";
		count++
	}else{
		count = 0;
		answerIsWrong();
		if (runningQuestion < lastQuestion) {
			runningQuestion++;
			renderQuestion();
		}else{
			clearInterval(TIMER);
			scoreRender();
		}

	}
}

function checkAnswer(answer){
	if (answer == questions[runningQuestion].correct) {
		score++;
		answerIsCorrect();
	}else{
		answerIsWrong();
	}
	count = 0;
	if (runningQuestion < lastQuestion) {
		runningQuestion++;
		renderQuestion();
	}else{
		clearInterval(TIMER);
		scoreRender();
	}

}

function answerIsCorrect(){
	document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

function answerIsWrong(){
	document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}
function scoreRender(){
	scoreDiv.style.display = "block";
	const scorePercent = Math.round(100 * score/questions.length);

	let img = (scorePercent >= 80) ? "img/5.png" :
	(scorePercent >= 60) ? "img/4.png" :
	(scorePercent >= 40) ? "img/3.png" :
	(scorePercent >= 20) ? "img/2.png" :
	"img/1.png";
	scoreDiv.innerHTML = "<p class='introduction'>"+ userName +", ваш результат</p><br>";
	scoreDiv.innerHTML += "<img src="+ img +">";
	scoreDiv.innerHTML += "<p class='scorePercent'>"+ scorePercent +"%</p>";
	scoreDiv.innerHTML += "<a id='export' class='myButton' download='' href='#''>Скачать результат</a>";
	result += "Правильных ответов: " + score.toString();
	$(function () {
		createDownloadLink("#export",result,"file.txt");
	});
}

function createDownloadLink(anchorSelector, str, fileName){
	
	if(window.navigator.msSaveOrOpenBlob) {
		var fileData = [str];
		blobObject = new Blob(fileData);
		$(anchorSelector).click(function(){
			window.navigator.msSaveOrOpenBlob(blobObject, fileName);
		});
	} else {
		var url = "data:text/plain;charset=utf-8," + encodeURIComponent(str);
		$(anchorSelector).attr("href", url);
	}
}
