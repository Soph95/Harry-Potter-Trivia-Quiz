"use strict";

const start = document.querySelector(".start-btn");
const startingPage = document.querySelector(".starting-page");
const optionsList = document.querySelector(".options-list");
const questionHeading = document.querySelector(".question");
const quit = document.querySelector(".quit");
const next = document.querySelector(".next");
const totalQuestions = document.querySelector(".totalQuestions");
const timerSpace = document.querySelector(".timer");
const timeBar = document.querySelector(".time-bar");
const quiz = document.querySelector(".quiz");
const scores = document.querySelector(".results");
const replay = document.querySelector(".replay");

const questions = [
  {
    question: "What house is Harry Potter in?",
    answer: "Gryffindor",
    options: ["Ravenclaw", "Hufflepuff", "Gryffindor", "Slytherin"],
  },
  {
    question: "What is Ron Weasley's middle name?",
    answer: "Bilius",
    options: ["Scott", "Bilius", "Vernon", "George"],
  },
  {
    question: "What occupation do Hermionie Granger's parents have?",
    answer: "Dentists",
    options: ["Dentists", "Doctors", "Lawyers", "Chefs"],
  },
  {
    question: "What is Hagrid's Hippogriff's name?",
    answer: "Buckbeak",
    options: ["Fang", "Buckbeak", "Norbert", "Aragog"],
  },
  {
    question: "Who said this.. 'Excuse me, I have to go vomit'?",
    answer: "Hermionie",
    options: ["Ron", "Harry", "Neville", "Hermionie"],
  },
  {
    question: "What is the name of Harry's owl?",
    answer: "Hedwig",
    options: ["Hedwig", "Dobby", "Padfoot", "Wormtail"],
  },
  {
    question: "How many Weasley children are there?",
    answer: "6",
    options: ["8", "7", "6", "5"],
  },
  {
    question: "Who's patronus is a doe?",
    answer: "Severus Snape",
    options: ["Severus Snape", "Harry Potter", "Luna Lovegood", "Draco Malfoy"],
  },
  {
    question: "Who does Harry see when he gets lost in Diagon Alley?",
    answer: "Hagrid",
    options: ["Ron", "Hermionie", "Dean", "Hagrid"],
  },
  {
    question: "What is this spell used for.. 'Episkey'?",
    answer: "Fixes minor injuries",
    options: [
      "Makes you invisible",
      "Creates fire",
      "Fixes minor injuries",
      "Creates water",
    ],
  },
];

let score = 0;
let inPlay = true;
let timeCount;
let questionCounter = 0;
let timeSecs = 10;
let widthValue = 0;
let barLine;

//Start quiz
start.addEventListener("click", function () {
  startingPage.classList.add("hidden");
  quiz.classList.remove("hidden");
  showQuestions(questionCounter);
  startTimer(10);
  TimeBarLine(0);
});

//When next button is clicked
next.addEventListener("click", function (event) {
  if (questionCounter < questions.length - 1) {
    questionCounter++;
    showQuestions(questionCounter);
    inPlay = true;
    clearInterval(timeCount);
    startTimer(timeSecs);
    clearInterval(barLine);
    TimeBarLine(widthValue);
    next.classList.add("hidden");
  } else {
    results();
  }
});

//When replay button is clicked
replay.addEventListener("click", function () {
  scores.classList.add("hidden");
  replay.classList.add("hidden");
  quiz.classList.remove("hidden");
  quit.classList.add("hidden");
  totalQuestions.classList.remove("hidden");
  questionCounter = 0;
  score = 0;
  inPlay = true;
  timeSecs = 10;
  widthValue = 0;
  showQuestions(questionCounter);
  clearInterval(timeCount);
  startTimer(timeSecs);
  clearInterval(barLine);
  TimeBarLine(widthValue);
});

//When quit button is clicked
quit.addEventListener("click", function () {
  window.location.reload();
});

//Show questions and options
function showQuestions(num) {
  let question = `<p>${questionCounter + 1}. ${questions[num].question}</p>`;
  questionHeading.innerHTML = question;

  let options = `<button type="button" class="option-btns">${questions[num].options[0]}</button> <br />
  <button type="button" class="option-btns">${questions[num].options[1]}</button> <br />
  <button type="button" class="option-btns">${questions[num].options[2]}</button> <br />
  <button type="button" class="option-btns">${questions[num].options[3]}</button>`;
  optionsList.innerHTML = options;

  totalQuestions.innerHTML = `<p>Question ${questionCounter + 1} of ${
    questions.length
  }</p>`;

  const optionBtns = optionsList.querySelectorAll(".option-btns");
  for (let i = 0; i < optionBtns.length; i++) {
    optionBtns[i].addEventListener("click", checkAnswer);
  }
}

//Check user options
function checkAnswer(event) {
  clearInterval(timeCount);
  clearInterval(barLine);
  let element = event.target;
  let correctAnswer = questions[questionCounter].answer;
  if (inPlay) {
    if (element.textContent == correctAnswer) {
      element.classList.add("correct");
      score++;
    } else {
      element.classList.add("incorrect");
      const optionBtns = optionsList.querySelectorAll(".option-btns");
      for (let i = 0; i < optionBtns.length; i++) {
        if (optionBtns[i].textContent == correctAnswer) {
          optionBtns[i].classList.add("correct");
        }
      }
    }
    inPlay = false;
  }
  next.classList.remove("hidden");
}

//Timer
function startTimer(time) {
  timeCount = setInterval(timer, 1000);
  function timer() {
    let timerText = `<div>Time remaining: ${time}</div>`;
    timerSpace.innerHTML = timerText;
    time--;
    if (time < 0) {
      clearInterval(timeCount);
      timerSpace.innerHTML = "You ran out of time!";

      let correctAnswer = questions[questionCounter].answer;
      const optionBtns = optionsList.querySelectorAll(".option-btns");

      for (let i = 0; i < optionBtns.length; i++) {
        if (optionBtns[i].textContent == correctAnswer) {
          optionBtns[i].classList.add("correct");
        }
      }
      inPlay = false;
      next.classList.remove("hidden");
    }
  }
}

//Timebar
function TimeBarLine(time) {
  barLine = setInterval(timer, 29);
  function timer() {
    time++;
    timeBar.style.width = `${time}px`;
    if (time > 375) {
      clearInterval(barLine);
    }
  }
}

//Get user results
function results() {
  quiz.classList.add("hidden");
  scores.classList.remove("hidden");
  next.classList.add("hidden");
  replay.classList.remove("hidden");
  quit.classList.remove("hidden");
  totalQuestions.classList.add("hidden");
  let str = score < 5 ? "Oops better luck next time!😤" : "Nice!😎";
  if (score == questions.length) str = "Excellent! You're a true fan🎉!";
  let resultText = `<p>End of Quiz</p>
  <p><p>${str}<p/> You got ${score} questions out of ${questions.length} correct!</p>`;
  scores.innerHTML = resultText;
}
