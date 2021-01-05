// Set elements 
var start = document.getElementById("home");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var timer = document.querySelector(".timeCount");
var progress = document.getElementById("progress");
var result = document.getElementById("result");
var username = document.getElementById('username');
var saveScoreBtn = document.getElementById('saveScoreBtn');
var finalScore = document.getElementById('totalScore');
var mostRecentScore = localStorage.getItem('mostRecentScore');

// Create object for quiz
var quizContent = [
    {
        question: `What does DOM stand for?`, 
        choiceA: `Document Object Model`, 
        choiceB: `Document Object Management`, 
        choiceC: `Data Output Message`, 
        answer: `A`, 
    },
    {
        question: `How can JavaScript be inserted into an HTML document?`, 
        choiceA: `By indicating with a comment`, 
        choiceB: `By using the <script> tag`, 
        choiceC: `By using the <Javascript> tag`, 
        answer: `B`, 
    },
    {
        question: `How can you add one-line comments in JavaScript?`, 
        choiceA: `By typing "//" before your comment`, 
        choiceB: `By putting your comment in quotations`, 
        choiceC: `By typing /* before your comment and then */ after your comment`, 
        answer: `A`, 
    },
    {
        question: `Which of the below is not something you'd use to declare a variable?`, 
        choiceA: `let`, 
        choiceB: `var`, 
        choiceC: `assign`, 
        answer: `C`, 
    },
    {
        question: `Which below would you use to assign a value to a variable?`, 
        choiceA: `=`, 
        choiceB: `==`, 
        choiceC: `===`, 
        answer: `A`, 
    },
    {
        question: `When creating a function, what goes after the name of the function?`, 
        choiceA: `Body of the function`, 
        choiceB: `Parameters in parenthesis`, 
        choiceC: `The word "function"`, 
        answer: `B`, 
    },
    {
        question: `Which of the below will ask the user a question and the choice is returned as true or false?`, 
        choiceA: `prompt(question)`, 
        choiceB: `confirm(question)`, 
        choiceC: `alert(question)`, 
        answer: `B`, 
    },
    {
        question: `Which is not a loop?`, 
        choiceA: `while`, 
        choiceB: `for`, 
        choiceC: `if`, 
        answer: `C`,  
    },
    {
        question: `A semicolon is used to...`, 
        choiceA: `Separate statements`, 
        choiceB: `Link two functions`, 
        choiceC: `Compare expressions`, 
        answer: `A`, 
    },
    {
        question: `How many basic data types are there in JavaScript?`, 
        choiceA: `10`, 
        choiceB: `5`,
        choiceC: `8`, 
        answer: `C`, 
    }
]

// Set variables
var lastQuestion = quizContent.length - 1;
var currentQuestion = 0;
var secondsLeft = 90; 
var score = 0; 

// Function to count down time
function setTime() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timer.textContent = secondsLeft + ` seconds`;
    
        if (secondsLeft === 0) {
          clearInterval(timerInterval);
          endQuiz();
        }
    
    }, 1000);
    
}

// Function show quiz content
function showQuiz() {
    var quiz = quizContent[currentQuestion];
    question.textContent = quiz.question;
    choiceA.textContent = quiz.choiceA;
    choiceB.textContent = quiz.choiceB;
    choiceC.textContent = quiz.choiceC;
}

// Event Listener for when "Start Quiz!" button is clicked
start.addEventListener("click",startQuiz);

// Function to start quiz
function startQuiz() {
    start.style.display = "none";
    showQuiz();
    quiz.style.display = "block";
    setTime()
}

// Function to check answer
function checkAnswer(answer) {
    if (answer == quizContent[currentQuestion].answer) {
        score++;
    } 

    if (currentQuestion < lastQuestion) {
        currentQuestion++;
        showQuiz();
    } else {
        endQuiz();
    }
}

// Function to end quiz
function endQuiz(){
    quiz.style.display = "none";
    result.style.display = "block";

    totalScore.innerHTML = score; 
}

// Saving score to local storage 
var highScores = JSON.parse(localStorage.getItem('highScores')) || [];

var saveHighScore = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value,
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/');
};