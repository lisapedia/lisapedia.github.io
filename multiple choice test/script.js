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

function showStart(){
	userData.style.display = "none";
	start.style.display = "block";
}

let count = 0;
const questionTime = 120; //120s
const gaugeWidth = 150; //150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

let questions = [
{
	question: "What does HTML stand for?",
	imgSrc: "img/html.png",
	choiceA: "Correct",
	choiceB: "Wrong",
	choiceC: "Wrong",
	choiceD: "Wrong",
	correct: "A"
},
{
	question: "What does CSS stand for?",
	imgSrc: "img/css.png",
	choiceA: "Wrong",
	choiceB: "Correct",
	choiceC: "Wrong",
	choiceD: "Wrong",
	correct: "B"
},
{
	question: "What does JS stand for?",
	imgSrc: "img/js.png",
	choiceA: "Wrong",
	choiceB: "Wrong",
	choiceC: "Correct",
	choiceD: "Wrong",
	correct: "C"
},
{
	question: "What does JS stand for?",
	imgSrc: "img/js.png",
	choiceA: "Wrong",
	choiceB: "Wrong",
	choiceC: "Wrong",
	choiceD: "Correct",
	correct: "D"
}
];

const lastQuestion = questions.length - 1;
let runningQuestion = 0;

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
	scoreDiv.innerHTML = "<img src="+ img +">";
	scoreDiv.innerHTML += "<p>"+ scorePercent +"%</p>";

}