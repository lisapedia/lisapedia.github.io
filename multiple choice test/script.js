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
	question: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio nam, quibusdam reprehenderit beatae, tempora consectetur vitae ad! Vero, amet, qui?",
	imgSrc: "img/question_1.png",
	choiceA: "Correct! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio nam, quibusdam reprehenderit beatae",
	choiceB: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio nam, quibusdam reprehenderit beatae",
	choiceC: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio nam, quibusdam reprehenderit beatae",
	choiceD: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio nam, quibusdam reprehenderit beatae",
	correct: "A"
},
{
	question: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio nam, quibusdam reprehenderit beatae, tempora consectetur vitae ad! Vero, amet, qui?",
	imgSrc: "img/question_2.png",
	choiceA: "Lorem ipsum dolor sit amet.",
	choiceB: "Correct! Lorem ipsum dolor sit.",
	choiceC: "Lorem ipsum dolor sit amet.",
	choiceD: "Lorem ipsum dolor sit amet.",
	correct: "B"
},
{
	question: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio nam, quibusdam reprehenderit beatae, tempora consectetur vitae ad! Vero, amet, qui?",
	imgSrc: "img/question_3.png",
	choiceA: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
	choiceB: "Lorem ipsum.",
	choiceC: "Correct! Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
	choiceD: "Lorem ipsum dolor sit amet.",
	correct: "C"
},
{
	question: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio nam, quibusdam reprehenderit beatae, tempora consectetur vitae ad! Vero, amet, qui?",
	imgSrc: "img/question_4.png",
	choiceA: "Wrong",
	choiceB: "Wrong",
	choiceC: "Wrong",
	choiceD: "Correct",
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
