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
var nameInput = document.querySelector("#name");
var scoreInput = document.querySelector("#totalScore");
var saveScoreBtn = document.querySelector("#submit");
var saveScore = document.querySelector("#saveScore");
var savedName = document.querySelector("#userName");
var savedScore = document.querySelector("#totalScore");

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
saveHighScore();

function displayMessage(type, message) {
  saveScore.textContent = message;
  saveScore.setAttribute("class", type);
}

function saveHighScore() {
  var name = localStorage.getItem("name");
  var highScore = localStorage.getItem("highScore");
  
  if (!name || !highScore) {
    return;
  }

  savedName.textContent = name;
  savedScore.textContent = highScore; 
}

saveScoreBtn.addEventListener("click", function(event) {
  event.preventDefault();

  var name = document.querySelector("#name").value;
  var highScore = document.querySelector("#totalScore").value; 

  if (name === "") {
    displayMessage("error", "Name cannot be blank");
  } else if (highScore === "0") {
    displayMessage("error", "You can do better!")
  }
    localStorage.setItem("name", name);
    localStorage.setItem("highScore", score)
    saveHighScore();
});