const questions = [
    {
        question: "Waarvoor is krachttraining vooral bedoeld?",
        answers: [
            "Om spieren sterker te maken",
            "Om alleen je conditie te trainen",
            "Om beter te kunnen slapen"
        ],
        correct: 0
    },
    {
        question: "Welke activiteit traint vooral je uithoudingsvermogen?",
        answers: [
            "Een zware boodschappentas optillen",
            "Hardlopen",
            "Een boek lezen"
        ],
        correct: 1
    },
    {
        question: "Waarom is rust belangrijk na een training?",
        answers: [
            "Je lichaam krijgt tijd om te herstellen",
            "Je spieren hoeven nooit meer te werken",
            "Je conditie verdwijnt niet als je rust"
        ],
        correct: 0
    },
    {
        question: "Welke voedingsstof speelt een belangrijke rol bij spierherstel?",
        answers: [
            "Eiwitten",
            "Alleen suiker",
            "Alleen zout"
        ],
        correct: 0
    },
    {
        question: "Wat is een verstandige manier om met fitness te beginnen?",
        answers: [
            "Meteen iedere dag maximaal trainen",
            "Rustig beginnen en geleidelijk opbouwen",
            "Herstel en slaap overslaan"
        ],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionNumber = document.getElementById("question-number");
const questionTitle = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("next-button");
const result = document.getElementById("result");
const scoreText = document.getElementById("score");
const restartButton = document.getElementById("restart-button");

function showQuestion() {
    answered = false;

    const current = questions[currentQuestion];

    questionNumber.textContent =
        `Vraag ${currentQuestion + 1} van ${questions.length}`;

    questionTitle.textContent = current.question;
    answerButtons.innerHTML = "";
    feedback.textContent = "";
    nextButton.hidden = true;
    result.hidden = true;
    questionTitle.hidden = false;
    answerButtons.hidden = false;
    questionNumber.hidden = false;

    current.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.textContent = answer;
        button.className = "button quiz-option";
        button.type = "button";

        button.addEventListener("click", () => {
            checkAnswer(index);
        });

        answerButtons.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    if (answered) return;

    answered = true;

    const current = questions[currentQuestion];
    const buttons = answerButtons.querySelectorAll("button");

    buttons.forEach(button => {
        button.disabled = true;
    });

    if (selectedIndex === current.correct) {
        score++;
        feedback.textContent = "Goed gedaan! Dat is het juiste antwoord.";
    } else {
        feedback.textContent =
            "Helaas, dat is niet juist. Het goede antwoord is: " +
            current.answers[current.correct];
    }

    nextButton.hidden = false;

    if (currentQuestion === questions.length - 1) {
        nextButton.textContent = "Bekijk mijn score";
    } else {
        nextButton.textContent = "Volgende vraag";
    }
}

function showResult() {
    questionNumber.hidden = true;
    questionTitle.hidden = true;
    answerButtons.hidden = true;
    feedback.textContent = "";
    nextButton.hidden = true;
    result.hidden = false;

    scoreText.textContent =
        `Je hebt ${score} van de ${questions.length} vragen goed!`;
}

nextButton.addEventListener("click", () => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

restartButton.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    showQuestion();
});

showQuestion();