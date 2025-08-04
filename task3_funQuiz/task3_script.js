const quizData = [
  {
    type: "single",
    question: "🧠 What’s the main purpose of a banana?",
    options: ["Eating", "Calling your crush", "Fixing bugs", "Remote control"],
    correct: "Eating"
  },
  {
    type: "multiple",
    question: "💻 What things do you *pretend* you're doing while coding?",
    options: ["Saving the world", "Being a hacker", "Looking busy", "Actually coding"],
    correct: ["Saving the world", "Being a hacker", "Looking busy"]
  },
  {
    type: "fill",
    question: "🛏️ What’s the best place to learn coding?",
    correct: "bed"
  }
];

let currentQuestion = 0;
let score = 0;

const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const nextBtn = document.getElementById("nextBtn");
const resultBox = document.getElementById("result");
const scoreText = document.getElementById("score");
const reaction = document.getElementById("reaction");

function loadQuestion() {
  const q = quizData[currentQuestion];
  questionText.innerText = q.question;
  optionsContainer.innerHTML = "";

  if (q.type === "single") {
    q.options.forEach(opt => {
      optionsContainer.innerHTML += `
        <label><input type="radio" name="answer" value="${opt}"> ${opt}</label>`;
    });
  }

  if (q.type === "multiple") {
    q.options.forEach(opt => {
      optionsContainer.innerHTML += `
        <label><input type="checkbox" name="answer" value="${opt}"> ${opt}</label>`;
    });
  }

  if (q.type === "fill") {
    optionsContainer.innerHTML = `<input type="text" id="fillInput" placeholder="Write something genius..." />`;
  }
}

function getUserAnswer() {
  const q = quizData[currentQuestion];

  if (q.type === "single") {
    const selected = document.querySelector('input[name="answer"]:checked');
    return selected ? selected.value : null;
  }

  if (q.type === "multiple") {
    const selected = [...document.querySelectorAll('input[name="answer"]:checked')].map(cb => cb.value);
    return selected;
  }

  if (q.type === "fill") {
    return document.getElementById("fillInput").value.trim().toLowerCase();
  }
}

function checkAnswer(userAnswer) {
  const q = quizData[currentQuestion];

  if (q.type === "single") {
    return userAnswer === q.correct;
  }

  if (q.type === "multiple") {
    return Array.isArray(userAnswer) &&
      userAnswer.length === q.correct.length &&
      userAnswer.every(val => q.correct.includes(val));
  }

  if (q.type === "fill") {
    return userAnswer === q.correct;
  }

  return false;
}

nextBtn.addEventListener("click", () => {
  const userAnswer = getUserAnswer();

  if (userAnswer === null || (Array.isArray(userAnswer) && userAnswer.length === 0)) {
    alert("Hey genius! Pick an answer 😅");
    return;
  }

  if (checkAnswer(userAnswer)) score++;

  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  document.getElementById("quizContainer").style.display = "none";
  resultBox.style.display = "block";
  scoreText.innerText = score;

  const messages = [
    "😅 At least you had fun!",
    "😎 Nice, not bad!",
    "🔥 You’re unstoppable!",
    "💯 You nailed it, you nerd!"
  ];
  reaction.innerText = messages[score] || "👏 Well done!";
}

// Start quiz
loadQuestion();
