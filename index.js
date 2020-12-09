"use strict";

const start = document.querySelector(".start-btn");
const startingPage = document.querySelector(".starting-page");
const optionsList = document.querySelector(".options-list");
const questionHeading = document.querySelector(".question");
const quit = document.querySelector(".quit");
const next = document.querySelector(".next");
const totalQuestions = document.querySelector(".totalQuestions");
const timerSpace = document.querySelector(".timer");

let score = 0;

const questions = [
  {
    question: "What house is Harry Potter in?",
    answer: "Gryfindor",
    options: ["Ravenclaw", "Hufflepuff", "Gryfindor", "Slytherin"],
  },
  {
    question: "What is Ron Weasleys middle name?",
    answer: "Billius",
    options: ["Scott", "Billius", "Vernon", "George"],
  },
  {
    question: "What occupation do Hermionie Grangers parents have?",
    answer: "Dentists",
    options: ["Dentists", "Doctors", "Lawyers", "Chefs"],
  },
  {
    question: "What is Hagrid's Hypogrith's name?",
    answer: "Buckbeek",
    options: ["Fang", "Buckbeek", "Norbert", "Aragog"],
  },
];

let inPlay = true;
let timeCount;
let questionCounter = 0;

//Start quiz
start.addEventListener("click", function () {
  startingPage.classList.add("hidden");
  next.classList.remove("hidden");
  timerSpace.classList.remove("hidden");
  showQuestions(questionCounter);
  Starttimer(10);
});

//When next button is clicked
next.addEventListener("click", function (event) {
  if (questionCounter < questions.length - 1) {
    questionCounter++;
    showQuestions(questionCounter);
  } // was a 0
  inPlay = true;
});

//Show questions and options
function showQuestions(num) {
  let question = `<p>${questionCounter + 1} ${questions[num].question}</p>`;
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
  let element = event.target;
  let correctAnswer = questions[questionCounter].answer;
  if (inPlay) {
    if (element.textContent == correctAnswer) element.classList.add("correct");
    else {
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
}

function Starttimer(time) {
  timeCount = setInterval(timer, 1000);
  function timer() {
    timerSpace.textContent = time;
    time--;
  }
}
//Continue button
